import { motion } from "framer-motion";
export default function Submitted(){
    return (
        <div className="flex justify-center mt-1">
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-green-50 border border-green-200 rounded-xl px-10 py-6 text-center max-w-xl w-full"
            >
                <h2 className="text-lg font-semibold text-green-600">
                    Anda sudah melakukan absensi hari ini
                </h2>
                <p className="text-sm text-green-600 mt-1">
                    Terima kasih atas kedisiplinan Anda.
                </p>
            </motion.div>
        </div>
    );
}