/**
 * ═══════════════════════════════════════════════════════════════════════
 *  HUSSAIN BROTHERS — ORDER BACKEND (Google Apps Script)
 * ═══════════════════════════════════════════════════════════════════════
 *  Paste this ENTIRE file into the Apps Script editor (Code.gs).
 *  See SETUP-GUIDE.md in this same folder for full step-by-step setup.
 *
 *  What this script does, on every order:
 *    1. Receives the order as JSON from the website (doPost)
 *    2. Validates the required fields
 *    3. Checks the Order Ref isn't already recorded (prevents duplicates
 *       from an accidental double-click on "Confirm Order")
 *    4. Appends one row to the "Orders" sheet
 *    5. Builds a clean PDF invoice
 *    6. Emails the invoice + order summary to the owner
 *    7. Returns a JSON success/failure response back to the website
 * ═══════════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────────────
// CONFIGURATION — change these two lines, nothing else needs editing
// ─────────────────────────────────────────────────────────────────────────

// The Gmail address that should receive every new order + invoice.
const OWNER_EMAIL = 'OWNER_EMAIL_HERE'; // e.g. 'hussainbrothers@gmail.com'

// Must exactly match the sheet tab name at the bottom of your spreadsheet.
const SHEET_NAME = 'Orders';

// Brand colors, used only for the PDF invoice's look — matches the website.
const BRAND = {
  pine: '#0F3D2E',
  gold: '#C9A24B',
  cream: '#FAF6EC',
  ink: '#1B241F',
};

// ─────────────────────────────────────────────────────────────────────────
// ENTRY POINT — called every time the website submits an order
// ─────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);

    const validationError = validateOrder(payload);
    if (validationError) {
      return jsonResponse({ success: false, message: validationError });
    }

    const sheet = getOrdersSheet();

    // Duplicate-order protection: if this Order Ref was already recorded
    // (e.g. the customer's request was sent twice), don't insert it again —
    // just confirm success so the customer still sees a success screen.
    if (orderAlreadyExists(sheet, payload.orderRef)) {
      return jsonResponse({
        success: true,
        orderRef: payload.orderRef,
        message: 'Order already recorded',
      });
    }

    appendOrderRow(sheet, payload);

    const pdfBlob = buildInvoicePdf(payload);
    sendOwnerEmail(payload, pdfBlob);

    return jsonResponse({
      success: true,
      orderRef: payload.orderRef,
      message: 'Order successfully recorded',
    });
  } catch (err) {
    return jsonResponse({
      success: false,
      message: 'Unable to process order: ' + err.message,
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────────────────────────────────

function validateOrder(payload) {
  if (!payload) return 'Missing order data.';
  if (!payload.orderRef) return 'Missing order reference.';

  const c = payload.customer;
  if (!c || !c.name || !c.phone || !c.city || !c.address) {
    return 'Missing required customer details.';
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return 'Order must contain at least one item.';
  }

  for (const item of payload.items) {
    if (!item.productName || !item.weight || !item.quantity || item.price == null) {
      return 'One or more order items are incomplete.';
    }
  }

  return null; // no error
}

// ─────────────────────────────────────────────────────────────────────────
// GOOGLE SHEET
// ─────────────────────────────────────────────────────────────────────────

function getOrdersSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('Sheet "' + SHEET_NAME + '" not found. Create it first — see SETUP-GUIDE.md.');
  }
  return sheet;
}

function orderAlreadyExists(sheet, orderRef) {
  const data = sheet.getDataRange().getValues();
  // Column A (index 0) is "Order Ref" — see header row in SETUP-GUIDE.md
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === orderRef) return true;
  }
  return false;
}

function appendOrderRow(sheet, payload) {
  const now = new Date();
  const itemsSummary = payload.items
    .map((item) => `${item.productName} (${item.weight}) x${item.quantity} - Rs ${item.price * item.quantity}`)
    .join('; ');

  sheet.appendRow([
    payload.orderRef,
    Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd'),
    Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm:ss'),
    payload.customer.name,
    payload.customer.phone,
    payload.customer.city,
    payload.customer.address,
    payload.customer.note || '',
    itemsSummary,
    payload.subtotal,
    payload.total,
    'Pending',
  ]);
}

// ─────────────────────────────────────────────────────────────────────────
// PDF INVOICE
// ─────────────────────────────────────────────────────────────────────────

function buildInvoicePdf(payload) {
  const itemRows = payload.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(item.productName)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(item.weight)}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">Rs ${item.price * item.quantity}</td>
      </tr>`
    )
    .join('');

  const html = `
    <html>
      <body style="font-family:Georgia,serif;color:${BRAND.ink};background:${BRAND.cream};padding:32px;">
        <div style="max-width:600px;margin:0 auto;background:#ffffff;padding:32px;border-radius:12px;">
          <div style="border-bottom:3px solid ${BRAND.gold};padding-bottom:16px;margin-bottom:24px;">
            <h1 style="color:${BRAND.pine};margin:0;font-size:22px;">HUSSAIN BROTHERS</h1>
            <p style="margin:4px 0 0;color:#6b6b6b;font-size:12px;letter-spacing:1px;">
              SKARDU DRY FRUITS &amp; NATURAL PRODUCTS
            </p>
            <p style="margin-top:16px;font-size:18px;color:${BRAND.pine};font-weight:bold;">INVOICE</p>
          </div>

          <table style="width:100%;font-size:13px;margin-bottom:20px;">
            <tr>
              <td><strong>Order Reference:</strong> ${escapeHtml(payload.orderRef)}</td>
              <td style="text-align:right;"><strong>Date:</strong> ${escapeHtml(payload.date)}</td>
            </tr>
          </table>

          <h3 style="color:${BRAND.pine};font-size:14px;margin-bottom:6px;">Customer Details</h3>
          <p style="font-size:13px;line-height:1.6;margin:0 0 20px;">
            ${escapeHtml(payload.customer.name)}<br/>
            ${escapeHtml(payload.customer.phone)}<br/>
            ${escapeHtml(payload.customer.city)}<br/>
            ${escapeHtml(payload.customer.address)}
          </p>

          <h3 style="color:${BRAND.pine};font-size:14px;margin-bottom:6px;">Order Details</h3>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead>
              <tr style="background:${BRAND.pine};color:#ffffff;">
                <th style="padding:8px;text-align:left;">Product</th>
                <th style="padding:8px;text-align:left;">Weight</th>
                <th style="padding:8px;text-align:center;">Qty</th>
                <th style="padding:8px;text-align:right;">Price</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>

          <table style="width:100%;font-size:14px;margin-top:16px;">
            <tr>
              <td></td>
              <td style="text-align:right;padding:4px 0;">Subtotal: <strong>Rs ${payload.subtotal}</strong></td>
            </tr>
            <tr>
              <td></td>
              <td style="text-align:right;padding:4px 0;font-size:16px;color:${BRAND.pine};">
                <strong>Total: Rs ${payload.total}</strong>
              </td>
            </tr>
          </table>

          <p style="margin-top:28px;font-size:13px;color:#6b6b6b;border-top:1px solid #eee;padding-top:16px;">
            Thank you for shopping with Hussain Brothers.
          </p>
        </div>
      </body>
    </html>`;

  const blob = HtmlService.createHtmlOutput(html).getBlob().getAs('application/pdf');
  blob.setName(`Invoice-${payload.orderRef}.pdf`);
  return blob;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ─────────────────────────────────────────────────────────────────────────
// EMAIL
// ─────────────────────────────────────────────────────────────────────────

function sendOwnerEmail(payload, pdfBlob) {
  const itemLines = payload.items
    .map((item) => `- ${item.productName} (${item.weight}) x${item.quantity} — Rs ${item.price * item.quantity}`)
    .join('\n');

  const subject = `New Order — ${payload.orderRef} — Rs ${payload.total}`;

  const body = `New order received on the Hussain Brothers website.

Order Reference: ${payload.orderRef}
Date: ${payload.date}

Customer Details
Name: ${payload.customer.name}
Phone: ${payload.customer.phone}
City: ${payload.customer.city}
Address: ${payload.customer.address}
${payload.customer.note ? 'Note: ' + payload.customer.note : ''}

Order Details
${itemLines}

Subtotal: Rs ${payload.subtotal}
Total: Rs ${payload.total}

The full invoice is attached as a PDF.`;

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: subject,
    body: body,
    attachments: [pdfBlob],
  });
}

// ─────────────────────────────────────────────────────────────────────────
// RESPONSE HELPER
// ─────────────────────────────────────────────────────────────────────────

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
