import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { HiX, HiOutlineCloudUpload } from 'react-icons/hi';

const ImageUploader = ({ preview, onFileSelect, onRemove }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="cursor-pointer group">
      <input {...getInputProps()} />
      {preview ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-44 h-44 rounded-3xl overflow-hidden shadow-xl shadow-gray-200/50 ring-4 ring-primary/10"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          
          {/* Change Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
            <HiOutlineCloudUpload className="w-8 h-8 text-white animate-bounce" />
            <span className="text-white text-[10px] font-black uppercase tracking-widest text-center px-4">Click to Change Photo</span>
          </div>

          {/* Remove button (stop propagation to not trigger upload) */}
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full z-20 shadow-lg border-none cursor-pointer"
          >
            <HiX className="w-3.5 h-3.5" />
          </motion.button>

          {/* Status Label */}
          <div className="absolute bottom-2 left-2 right-2 z-10">
            <div className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black text-gray-700 uppercase tracking-tighter">Ready to Save</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 overflow-hidden min-h-[176px] flex flex-col items-center justify-center
            ${isDragActive
              ? 'border-primary bg-primary/5 scale-102'
              : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
            }`}
        >
          {/* Animated background icon */}
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
            <HiOutlineCloudUpload className="w-6 h-6 text-gray-400 group-hover:text-primary transition-colors" />
          </div>

          <p className="text-xs font-bold text-gray-600 mb-1">
            {isDragActive ? 'Drop here!' : 'Click to Upload'}
          </p>
          <p className="text-[10px] text-gray-400 uppercase tracking-tight">JPG/PNG up to 5MB</p>
        </motion.div>
      )}
    </div>
  );
};

export default ImageUploader;
