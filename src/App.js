import React, { useState } from 'react';
import './App.css'

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [nom, setNom] = useState('');
  const [cl, setCl] = useState('');
  const [tauxAlcool, setTauxAlcool] = useState('');
  const [prix, setPrix] = useState('');
  const [schlagFactor, setSchlagFactor] = useState(null);
  const [dataBeerShlag, setDataBeerShlag] = useState([]);

  // Fonction pour télécharger le contenu au format JSON
  const downloadJson = () => {
    const json = JSON.stringify(dataBeerShlag, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dataBeerShlag.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const calculateSchlagFactor = (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    if (!nom || !cl || !tauxAlcool || !prix) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const parsedCl = parseFloat(cl);
    const parsedTauxAlcool = parseFloat(tauxAlcool);
    const parsedPrix = parseFloat(prix);

    // Vérifier si les valeurs sont des nombres valides
    if (isNaN(parsedCl) || isNaN(parsedTauxAlcool) || isNaN(parsedPrix)) {
      alert('Veuillez entrer des nombres valides');
      return;
    }

    const schlagFactorValue = (parsedTauxAlcool / parsedPrix) * parsedCl;
    const newData = {
      imageUrl: imageUrl,
      nom: nom,
      cl: parsedCl,
      tauxAlcool: parsedTauxAlcool,
      prix: parsedPrix,
      schlagFactor: schlagFactorValue.toFixed(2)
    };

    // Copie des données existantes, ajout de la nouvelle donnée, puis tri
    const updatedDataBeerShlag = [...dataBeerShlag, newData].sort((a, b) => b.schlagFactor - a.schlagFactor);

    setDataBeerShlag(updatedDataBeerShlag);
    setSchlagFactor(schlagFactorValue.toFixed(2)); // Arrondi à 2 décimales
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        console.log(jsonData)
        setDataBeerShlag(jsonData);
      } catch (error) {
        console.error('Erreur de lecture du fichier JSON :', error);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#28a745' }}>
        <h2>Le Schlag Factor est le meilleur moyen de calculer la qualité coût/prix.</h2>
        <h2> Plus il est élevé, meilleure sera ta cuite pour ton portefeuille.</h2>
      </div>
      <form style={{ marginTop: '100px' }} onSubmit={calculateSchlagFactor}>
        <div>
          <label>
            {"Image Url (obtionel)"}:
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Nom:
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            CL:
            <input
              type="text"
              value={cl}
              onChange={(e) => setCl(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Taux Alcool:
            <input
              type="text"
              value={tauxAlcool}
              onChange={(e) => setTauxAlcool(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Prix:
            <input
              type="text"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Appliquer</button>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {schlagFactor !== null && (
          <div>
            <h2>Schlag Factor de pour {nom} {schlagFactor}:</h2>
          </div>
        )}
        <button onClick={downloadJson}>Télécharger dataBeerShlag.json</button>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
        />
        <ul>
          {dataBeerShlag.map((data, index) => (
            <div  key={index}>

              <div style={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                {data.imageUrl === '' ?
                  <div style={{ height: '64px', width: '64px', backgroundColor: 'rgba(134, 134, 134, 0.28)', marginRight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '100px' }}><p>NO</p></div>
                  :
                  <img alt='beerProfil' src={data.imageUrl} style={{ height: '64px', width: '64px', backgroundColor: 'gray', marginRight: '50px' }}></img>
                }
                <h1 style={{ marginRight: '50px' }}><strong>{index + 1}</strong></h1>
                <h1 style={{ marginRight: '50px' }}><strong>{data.nom}</strong> </h1>
                <p> {data.cl}CL - {data.tauxAlcool}% - {data.prix}€ = <strong>SCORE: {data.schlagFactor}</strong></p>
              </div>
              <div style={{borderBottom: '1px solid black'}}/>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
