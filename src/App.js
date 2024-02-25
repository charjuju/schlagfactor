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
  const [editIndex, setEditIndex] = useState(null);
  const [imageUrlEdit, setEditImageUrl] = useState('');
  const [nomEdit, setEditNom] = useState('');
  const [clEdit, setEditCl] = useState('');
  const [tauxAlcoolEdit, setEditTauxAlcool] = useState('');
  const [prixEdit, setEditPrix] = useState('');
  const [tSurPoto, settSurPoto] = useState(false);

  const handleEdit = (indexToRemove) => {
    // Vérifier si tous les champs sont remplis
    if (!nomEdit || !clEdit || !tauxAlcoolEdit || !prixEdit) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const parsedCl = parseFloat(clEdit);
    const parsedTauxAlcool = parseFloat(tauxAlcoolEdit);
    const parsedPrix = parseFloat(prixEdit);

    // Vérifier si les valeurs sont des nombres valides
    if (isNaN(parsedCl) || isNaN(parsedTauxAlcool) || isNaN(parsedPrix)) {
      alert('Veuillez entrer des nombres valides');
      return;
    }

    const schlagFactorValue = (parsedTauxAlcool / parsedPrix) * parsedCl;
    const newData = {
      imageUrl: imageUrlEdit,
      nom: nomEdit,
      cl: parsedCl,
      tauxAlcool: parsedTauxAlcool,
      prix: parsedPrix,
      schlagFactor: schlagFactorValue.toFixed(2)
    };

    // Copie des données existantes, ajout de la nouvelle donnée, puis tri
    const updatedData = dataBeerShlag.filter((_, index) => index !== indexToRemove);
    const updatedDataBeerShlag = [...updatedData, newData].sort((a, b) => b.schlagFactor - a.schlagFactor);

    setDataBeerShlag(updatedDataBeerShlag);
    setEditIndex(null)
  };

  // Fonction pour afficher les champs de saisie lorsque vous appuyez sur le bouton "Edit"
  const handleEditClick = (index) => {
    const beerToEdit = dataBeerShlag[index];
    setEditImageUrl(beerToEdit.imageUrl);
    setEditNom(beerToEdit.nom);
    setEditCl(beerToEdit.cl);
    setEditTauxAlcool(beerToEdit.tauxAlcool);
    setEditPrix(beerToEdit.prix);
    setEditIndex(index);
  };

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
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      {tSurPoto &&
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: '0px', left: '0px', width: '100%', height: '100vh', backgroundColor: 'rgba(134, 134, 134, 0.28)' }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px' }}>
            <h1>T'ai sur poto?</h1>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <button onClick={() => {setDataBeerShlag([]); settSurPoto(false)}}>oui</button>
              <button onClick={() => settSurPoto(false)}>Non</button>
            </div>
          </div>
        </div>
      }
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#28a745' }}>
        <h2>Le Schlag Factor est le meilleur moyen de calculer la qualité cuite/prix.</h2>
        <h2> Plus il est élevé, meilleure sera ta cuite pour ton portefeuille.</h2>
      </div>
      <form style={{ marginTop: '100px', margin: '25px' }} onSubmit={calculateSchlagFactor}>
        <div className='input-text-form'>
          <label>
            {"Image Url (obtionel)"}:
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
        </div>
        <div className='input-text-form'>
          <label>
            Nom:
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </label>
        </div>
        <div className='input-text-form'>
          <label>
            CL:
            <input
              type="text"
              value={cl}
              onChange={(e) => setCl(e.target.value)}
            />
          </label>
        </div>
        <div className='input-text-form'>
          <label>
            Taux Alcool:
            <input
              type="text"
              value={tauxAlcool}
              onChange={(e) => setTauxAlcool(e.target.value)}
            />
          </label>
        </div>
        <div className='input-text-form'>
          <label>
            Prix:
            <input
              type="text"
              value={prix}
              onChange={(e) => setPrix(e.target.value)}
            />
          </label>
        </div>
        <div style={{ margin: '0px', width: '200px', padding: '10px' }}>
          <button className='button-vert' style={{ margin: '0px', width: '100%', height: '100%' }} type="submit">Appliquer</button>
        </div>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {schlagFactor !== null && (
          <div>
            <h2>Schlag Factor de pour {nom} {schlagFactor}:</h2>
          </div>
        )}
        <button style={{ marginBottom: '25px' }} onClick={downloadJson}>Télécharger dataBeerShlag.json</button>
        <input
          type="file"
          accept=".json"
          onChange={handleFileUpload}
        />
        <ul>
          {dataBeerShlag.length > 0 &&
            <div style={{ display: 'flex', flexDirection: "row-reverse", marginBottom: '10px' }}>
              <button onClick={() => settSurPoto(true)} className='button-vert'>supprimer les information</button>
            </div>
          }
          {dataBeerShlag.map((data, index) => (
            <div key={index} >

              <div className='stateConteneur' key={index} style={{}}>
                <div className='img-and-top'>
                  {data.imageUrl === '' ?
                    <div style={{ height: '64px', width: '64px', backgroundColor: 'rgba(134, 134, 134, 0.28)', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p>NO</p>
                    </div>
                    :
                    <img alt='beerProfil' src={data.imageUrl} style={{ height: '64px', width: '64px' }}></img>
                  }
                  <h1><strong>{index + 1}</strong></h1>
                </div>
                <div className='nom-and-score'>
                  <h1><strong>{data.nom}</strong></h1>
                  <p>{data.cl}CL - {data.tauxAlcool}% - {data.prix}€ = <strong>SCORE: {data.schlagFactor}</strong></p>
                </div>
                {editIndex === index ? (
                  <div style={{ position: 'fixed', backgroundColor: 'rgba(40, 167, 69, 0.28)', width: '100%', height: '100vh', top: 0, left: 0, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <div style={{ width: '50vw', backgroundColor: 'white', borderRadius: '24px', display: 'flex', flexWrap: 'wrap', padding: '50px', justifyContent: 'space-between' }}>
                      <div className='edit-inpit-div'>
                        <p>Url</p>
                        <input style={{ margin: '10px' }}
                          type="text"
                          value={imageUrlEdit}
                          onChange={(e) => setEditImageUrl(e.target.value)}
                          defaultValue="yes"
                        />
                      </div>
                      <div className='edit-inpit-div'>
                        <p>Nom</p>
                        <input style={{ margin: '10px' }}
                          type="text"
                          value={nomEdit}
                          onChange={(e) => setEditNom(e.target.value)}
                          placeholder="Nom"
                        />
                      </div>
                      <div className='edit-inpit-div'>

                        <p>Cl</p>
                        <input style={{ margin: '10px' }}
                          type="text"
                          value={clEdit}
                          onChange={(e) => setEditCl(e.target.value)}
                          placeholder="Cl"
                        />
                      </div>
                      <div className='edit-inpit-div'>

                        <p>Alcool</p>
                        <input style={{ margin: '10px' }}
                          type="text"
                          value={tauxAlcoolEdit}
                          onChange={(e) => setEditTauxAlcool(e.target.value)}
                          placeholder="Taux Alcool"
                        />
                      </div>
                      <div className='edit-inpit-div'>
                        <p>Prix</p>
                        <input style={{ margin: '10px' }}
                          type="text"
                          value={prixEdit}
                          onChange={(e) => setEditPrix(e.target.value)}
                          placeholder="Prix"
                        />
                      </div>
                      <div style={{ display: 'flex' }}>
                        <button className='button-vert' style={{ margin: '10px' }} onClick={() => handleEdit(index)}>Save</button>
                        <button style={{ margin: '10px' }} onClick={() => setEditIndex(null)}>Annuler</button>
                        <button style={{ margin: '10px' }} onClick={() => { setDataBeerShlag(dataBeerShlag.filter((_, i) => index !== i)); setEditIndex(null) }}>Supprimer</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button style={{ width: '70px' }} onClick={() => handleEditClick(index)}>Edit</button>
                )}
              </div>
              <div style={{ borderBottom: '1px solid black' }} />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
