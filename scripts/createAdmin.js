#!/usr/bin/env node
/**
 * scripts/createAdmin.js
 *
 * Uso: node scripts/createAdmin.js <email> <password>
 *
 * Requisitos:
 * - Tener instalado: npm install firebase-admin
 * - Colocar el archivo de credenciales de servicio descargado desde
 *   Firebase Console en la raíz del repo con el nombre: serviceAccountKey.json
 * - El script inicializa el Admin SDK y crea el usuario, y escribe en
 *   /users/{uid} solo el campo role: "admin" y created timestamp.
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

const SERVICE_ACCOUNT_PATH = path.join(__dirname, '..', 'serviceAccountKey.json');

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error(`Service account file not found at ${SERVICE_ACCOUNT_PATH}`);
  console.error('Descarga el JSON desde Firebase Console → Project Settings → Service accounts');
  process.exit(1);
}

const serviceAccount = require(SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://esp1-53532-default-rtdb.firebaseio.com'
});

async function createAdmin(email, password) {
  try {
    const userRecord = await admin.auth().createUser({ email, password });
    const uid = userRecord.uid;

    await admin.database().ref(`users/${uid}`).set({
      role: 'admin',
      created: Date.now()
    });

    console.log('Admin creado con éxito:');
    console.log('  uid:', uid);
    console.log('  email:', email);
    console.log('Recuerda guardar de forma segura las credenciales y no subir serviceAccountKey.json a repositorios públicos.');
  } catch (err) {
    console.error('Error creando admin:', err.message || err);
    process.exit(1);
  }
}

const [,, email, password] = process.argv;
if (!email || !password) {
  console.error('Uso: node scripts/createAdmin.js <email> <password>');
  process.exit(1);
}

createAdmin(email, password).then(() => process.exit(0));
