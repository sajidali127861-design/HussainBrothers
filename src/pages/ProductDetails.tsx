import { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronRight, MessageCircle, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import SEO from '@/components/common/SEO';
import QuantitySelector from '@/components/common/QuantitySelector';
import ProductGrid from '@/components/product/ProductGrid';
import { getProductBySlug, getProductsByCategory } from '@/data/products';
import { formatPrice } from '@/utils/currency';
import { buildProductInquiryMessage, buildWhatsAppUrl } from '@/utils/whatsapp';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { showToast } = useToast();

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getProductsByCategory(product.category).filter((p) => p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return <Navigate to="/shop" replace />;
  }

  const selectedVariant = product.variants[selectedVariantIndex];
  const inStock = selectedVariant.stock > 0;

  const handleAddToCart = () => {
    addToCart(
      {
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        weight: selectedVariant.weight,
        price: selectedVariant.price,
      },
      quantity
    );
    showToast(`${product.name} (${selectedVariant.weight}) x${quantity} added to cart`);
  };

  const whatsappUrl = buildWhatsAppUrl(buildProductInquiryMessage(product.name, selectedVariant.weight));

  return (
    <>
      <SEO title={product.name} description={product.description} />

      <section className="container-page py-8 sm:py-12">
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-pine-400" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-pine-700">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-pine-700">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-pine-700">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="text-pine-600">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
          {/* IMAGES */}
          <div>
            <div className="aspect-square overflow-hidden rounded-2xl bg-pine-50">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`h-16 w-16 overflow-hidden rounded-xl border-2 transition-colors ${
                      selectedImage === i ? 'border-gold-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div>
            <span className="text-xs font-medium text-gold-600">{product.category}</span>
            <h1 className="mt-1 font-display text-2xl font-semibold text-pine-800 sm:text-3xl">
              {product.name}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-pine-500 sm:text-base">
              {product.longDescription ?? product.description}
            </p>

            <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-y border-pine-100 py-4 text-sm">
              <div>
                <dt className="text-pine-400">Origin</dt>
                <dd className="font-medium text-pine-700">{product.origin}</dd>
              </div>
              <div>
                <dt className="text-pine-400">Availability</dt>
                <dd className={`font-medium ${inStock ? 'text-pine-700' : 'text-red-500'}`}>
                  {inStock ? 'In stock' : 'Out of stock'}
                </dd>
              </div>
            </dl>

            <p className="mt-5 font-display text-2xl font-semibold text-pine-800">
              {formatPrice(selectedVariant.price)}
            </p>

            <div className="mt-4">
              <span className="label-field">Weight</span>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant, i) => (
                  <button
                    key={variant.weight}
                    onClick={() => {
                      setSelectedVariantIndex(i);
                      setQuantity(1);
                    }}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      selectedVariantIndex === i
                        ? 'border-pine-700 bg-pine-700 text-cream-100'
                        : 'border-pine-200 text-pine-600 hover:border-pine-400'
                    }`}
                  >
                    {variant.weight}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <span className="label-field">Quantity</span>
              <QuantitySelector quantity={quantity} onChange={setQuantity} max={Math.max(selectedVariant.stock, 1)} />
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={handleAddToCart} disabled={!inStock} className="btn-primary flex-1">
                <ShoppingBag size={17} />
                Add to Cart
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1">
                <MessageCircle size={17} />
                Order on WhatsApp
              </a>
            </div>

            <div className="mt-6 space-y-2.5 rounded-xl bg-cream-200 p-4">
              <p className="flex items-center gap-2 text-xs text-pine-600">
                <Truck size={15} className="shrink-0 text-pine-500" />
                Delivered across Pakistan — charges confirmed on WhatsApp.
              </p>
              <p className="flex items-center gap-2 text-xs text-pine-600">
                <ShieldCheck size={15} className="shrink-0 text-pine-500" />
                Hand-checked for freshness and quality before packing.
              </p>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <h2 className="font-display text-xl font-semibold text-pine-800 sm:text-2xl">
              You may also like
            </h2>
            <div className="mt-6">
              <ProductGrid products={relatedProducts} />
            </div>
          </div>
        )}
      </section>
    </>
  );
}
