import Link from "next/link";
import Image from "next/image";

export function ProductCard({ p }: { p: any }) {
    return (
        <Link 
            href={`/products/${p._id}`}
            className="group relative flex flex-col bg-slate-900/40 border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-300 hover:border-indigo-500/20 hover:-translate-y-1 hover:shadow-2xl"
        >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black flex items-center justify-center">
                <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-40" />

                {/* Floating Category Badge */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {p.category}
                </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                        {p.name}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2 mt-2 leading-relaxed">
                        {p.description}
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <span className="text-xl font-black text-white">
                        ${p.price}
                    </span>
                    <span className="text-indigo-400 group-hover:text-indigo-300 font-bold text-sm flex items-center gap-1">
                        Buy Now
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                </div>
            </div>
        </Link>
    );
}