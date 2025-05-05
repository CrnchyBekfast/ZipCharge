const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const admin = require('firebase-admin');

app.use(express.static(path.join(__dirname, 'public')));

const serviceAccount = require('./zipcharge-f8e9d-firebase-adminsdk-fbsvc-9fbc37c018.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://zipcharge-f8e9d-default-rtdb.europe-west1.firebasedatabase.app'
});

const db = admin.database(); // Get the Realtime Database reference

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

app.get('/realtime-data', async (req, res) => {
    console.log('Request received at /realtime-data'); // Add this
    try {
      const snapshot = await db.ref('/state1').once('value');
      const currentValue = snapshot.val();
      console.log('Current state1 value:', currentValue); // Add this
      let newValue;
  
      if (currentValue === 0) {
        newValue = 1;
      } else if (currentValue === 1) {
        newValue = 0;
      } else {
        newValue = 0;
      }
      console.log('New state1 value to set:', newValue); // Add this
  
      const state1Ref = db.ref('/state1');
  
      async function updateState1Set(valueToSet) {
        try {
          await state1Ref.set(valueToSet);
          console.log(`Successfully set state1 to: ${valueToSet}`);
        } catch (error) {
          console.error('Error setting state1:', error);
        }
      }
  
      await updateState1Set(newValue);
  
      const snapshot2 = await db.ref('/').once('value');
      const data2 = snapshot2.val();
      console.log('Data sent to frontend:', data2); // Add this
  
      if (data2) {
        res.json({ state1: data2.state1, state2: data2.state2, state3: data2.state3 });
      } else {
        res.status(404).send('Data not found at the root');
      }
    } catch (error) {
      console.error('Error processing data:', error);
      res.status(500).send('Error processing data');
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
