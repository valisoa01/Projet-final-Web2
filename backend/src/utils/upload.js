const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Dossier où seront stockées les images
const uploadDir = path.join(__dirname, '..', '..', 'uploads');

// Crée le dossier si il n'existe pas
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuration du stockage avec multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // récupère l'extension du fichier
    const base = file.fieldname + '-' + Date.now(); // nom unique
    cb(null, base + ext);
  },
});

// Filtrage des fichiers : accepte uniquement les images
function fileFilter(req, file, cb) {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
}

// Limite la taille des fichiers à 5 Mo
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
