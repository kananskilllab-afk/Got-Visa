import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { HiOutlinePhotograph, HiX, HiOutlineCloudUpload } from 'react-icons/hi';

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
    <div>
      {preview ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-44 h-44 rounded-3xl overflow-hidden group shadow-xl shadow-gray-200/50 ring-4 ring-primary/10"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Remove button */}
          <motion.button
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={onRemove}
            className="absolute top-3 right-3 p-2.5 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer border-none shadow-lg"
          >
            <HiX className="w-4 h-4" />
          </motion.button>
          {/* Success indicator */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-sm rounded-xl">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-secondary to-lime" />
              <span className="text-xs font-bold text-gray-700">Image uploaded</span>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 overflow-hidden
            ${isDragActive
              ? 'border-primary bg-gradient-to-br from-primary/10 via-sky/5 to-secondary/10 scale-102'
              : 'border-gray-300 hover:border-primary/70 hover:bg-gradient-to-br hover:from-gray-50 hover:to-primary/5'
            }`}
        >
          <input {...getInputProps()} />

          {/* Animated background icon */}
          <motion.div
            animate={{
              y: isDragActive ? [0, -10, 0] : [0, -5, 0],
              scale: isDragActive ? 1.1 : 1,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="mb-4"
          >
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 via-sky/20 to-secondary/20 flex items-center justify-center">
              <HiOutlineCloudUpload className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          {/* Text content */}
          <motion.p
            animate={{
              color: isDragActive ? '#284695' : '#6b7280',
            }}
            className="text-sm font-bold mb-2"
          >
            {isDragActive ? 'Drop the image here...' : 'Drag & drop or click to upload'}
          </motion.p>

          <p className="text-xs text-gray-400 font-medium">
            JPG, PNG or WebP (max 5MB)
          </p>

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ImageUploader;
