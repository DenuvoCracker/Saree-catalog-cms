import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Badge from "../ui/Badge.jsx";
import ConfirmDialog from "../ui/ConfirmDialog.jsx";
import { formatCurrency } from "../../utils/formatCurrency.js";
import { deleteProduct } from "../../services/productService.js";

export default function ProductTable({ products, onDeleted }) {
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  async function confirmDelete() {
    setDeleting(true);
    try {
      await deleteProduct(pendingDelete.id);
      toast.success(`"${pendingDelete.name}" deleted`);
      onDeleted();
    } catch (err) {
      toast.error("Couldn't delete product. Please try again.");
      console.error(err);
    } finally {
      setDeleting(false);
      setPendingDelete(null);
    }
  }

  if (!products.length) {
    return <p className="font-body text-ink/60 py-10 text-center">No products yet. Add your first saree to get started.</p>;
  }

  return (
    <>
      <div className="overflow-x-auto rounded-sm border border-gold/20">
        <table className="w-full text-sm font-body">
          <thead className="bg-maroon text-cream text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Status</th>
              <th className="p-3">Badges</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-gold/10 hover:bg-cream/60">
                <td className="p-3">
                  <img src={p.image_urls?.[0]} alt={p.name} className="w-12 h-12 object-cover rounded-sm" />
                </td>
                <td className="p-3 font-semibold text-ink">{p.name}</td>
                <td className="p-3 text-ink/70">{p.category}</td>
                <td className="p-3">{formatCurrency(p.price)}</td>
                <td className="p-3">
                  <Badge variant={p.stock_status === "sold_out" ? "soldOut" : "inStock"}>
                    {p.stock_status === "sold_out" ? "Sold Out" : "In Stock"}
                  </Badge>
                </td>
                <td className="p-3 space-x-1">
                  {p.new_arrival && <Badge variant="new">New</Badge>}
                  {p.trending && <Badge variant="trending">Trend</Badge>}
                  {p.featured && <Badge variant="bestseller">Best</Badge>}
                </td>
                <td className="p-3">
                  <div className="flex gap-3">
                    <Link to={`/admin/products/edit/${p.id}`} aria-label={`Edit ${p.name}`} className="text-maroon hover:text-gold-dark">
                      <Pencil size={18} />
                    </Link>
                    <button
                      onClick={() => setPendingDelete(p)}
                      aria-label={`Delete ${p.name}`}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this product?"
        message={`"${pendingDelete?.name}" and its images will be permanently removed. This can't be undone.`}
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
        confirmLabel={deleting ? "Deleting…" : "Delete"}
      />
    </>
  );
}
