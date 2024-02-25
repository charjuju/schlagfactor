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

  const defaudListe = [
    {
      "imageUrl": "https://media.carrefour.fr/medias/9ec304c39ee231f58a22371c1cc585ad/p_1500x1500/3560071089610-0.jpg",
      "nom": "8 Prestige",
      "cl": 50,
      "tauxAlcool": 8,
      "prix": 0.95,
      "schlagFactor": "421.05"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/e5b09ef01cf63e1ca4576ae397b815ea/p_1500x1500/3560070287895-0.jpg",
      "nom": "Koenigsnier",
      "cl": 50,
      "tauxAlcool": 7,
      "prix": 0.95,
      "schlagFactor": "368.42"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/3e06d781573538a4aacf9b082f0d3f2d/p_1500x1500/03162330245029-a1n1-s01.jpg",
      "nom": "Saint-omer",
      "cl": 50,
      "tauxAlcool": 8,
      "prix": 1.19,
      "schlagFactor": "336.13"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/e55e9a07019b347fb1ba1a156e63d3f3/p_1500x1500/08725000625092-a1c1-s01.jpg",
      "nom": "Atlas",
      "cl": 50,
      "tauxAlcool": 7.2,
      "prix": 1.15,
      "schlagFactor": "313.04"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/e6acbac1f37d3e33b6f8d1f52f6eaf17/p_1500x1500/00000087167993-a1n1-s01.jpg",
      "nom": "Maximator AMSTERDAM ",
      "cl": 50,
      "tauxAlcool": 11.6,
      "prix": 1.95,
      "schlagFactor": "297.44"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/b9f32de258243a27a1fe8f8b139183d4/p_1500x1500/08714800026949-c1n1-s04.jpg",
      "nom": "8.6 EXTREME intense",
      "cl": 50,
      "tauxAlcool": 10.5,
      "prix": 1.95,
      "schlagFactor": "269.23"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/dd5e847557383909979363e217dc2c45/p_1500x1500/08716700015238-a1n1-s01.jpg",
      "nom": "Navigator AMSTERDAM ",
      "cl": 50,
      "tauxAlcool": 8,
      "prix": 1.55,
      "schlagFactor": "258.06"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/78052d7118c1375bbbca5df8c75405a9/p_1500x1500/05410228273561-c1n1-s01.jpg",
      "nom": "ATLAS blonde",
      "cl": 50,
      "tauxAlcool": 4.5,
      "prix": 0.99,
      "schlagFactor": "227.27"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/69f52bed8d813439955b7396a5eb5ea8/p_1500x1500/03291820012251-c1n1-s08.jpg",
      "nom": "RINCE COCHON blonde",
      "cl": 50,
      "tauxAlcool": 8.5,
      "prix": 1.99,
      "schlagFactor": "213.57"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/ec18b14b8bef384eafd9bf6d97ed76c3/p_1500x1500/08714800014182-c1n1-s06.jpg",
      "nom": "8.6 Red",
      "cl": 50,
      "tauxAlcool": 7.9,
      "prix": 1.85,
      "schlagFactor": "213.51"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/30e03acc88593e7f9faa79a632904c3a/p_1500x1500/03080210003319-h1n1-s13.jpg",
      "nom": "1664 Blonde",
      "cl": 50,
      "tauxAlcool": 5.5,
      "prix": 1.29,
      "schlagFactor": "213.18"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/7856baa3d8fb36428430b07e7d1ae545/p_1500x1500/03119780268696-h1l1-s01.jpg",
      "nom": "Heineken",
      "cl": 50,
      "tauxAlcool": 5,
      "prix": 1.25,
      "schlagFactor": "200.00"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/38843ac4b57033bd805d3ecb5c140b0b/p_1500x1500/05410228222941-a1n1-s01.jpg",
      "nom": "Leffe",
      "cl": 50,
      "tauxAlcool": 6.6,
      "prix": 1.69,
      "schlagFactor": "195.27"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/d8abe0099ba73e478721f56c052d4d1d/p_1500x1500/08714800025898-c1n1-s08.jpg",
      "nom": "8.6 black",
      "cl": 50,
      "tauxAlcool": 7.9,
      "prix": 2.29,
      "schlagFactor": "172.49"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/ae3a44940cef3d0e962a69de8c5b2be3/p_1500x1500/08712000051310-h1n1-s00.jpg",
      "nom": "Affligem Blonde",
      "cl": 500,
      "tauxAlcool": 6.7,
      "prix": 20.75,
      "schlagFactor": "161.45"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/7b60941e264034a89d3d9c260fe5475d/p_1500x1500/03080210008116-a1n1-s61.jpg",
      "nom": "Grimbergen",
      "cl": 50,
      "tauxAlcool": 6.7,
      "prix": 2.09,
      "schlagFactor": "160.29"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/3d03acbde50b3b878752135f07c25839/p_1500x1500/03119780266401-h1c1-s69.jpg",
      "nom": "Desperados",
      "cl": 50,
      "tauxAlcool": 5.9,
      "prix": 1.85,
      "schlagFactor": "159.46"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/4c989792f0403c86993b3a195b1e3dcc/p_1500x1500/03272460151791-a1n1-s01.jpg",
      "nom": "LA BETE blanche",
      "cl": 50,
      "tauxAlcool": 5.2,
      "prix": 1.95,
      "schlagFactor": "133.33"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/8aeacdfc58c032cc965b88888ba50cdd/p_1500x1500/03119780268894-h1n1-s18.jpg",
      "nom": "Heineken fût",
      "cl": 500,
      "tauxAlcool": 5,
      "prix": 18.85,
      "schlagFactor": "132.63"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/586c756adc8239d6a5ff35d1b9944acb/p_1500x1500/03119780260881-h1n1-s46.jpg",
      "nom": "Affligem Fruit Rouges",
      "cl": 500,
      "tauxAlcool": 5.2,
      "prix": 24,
      "schlagFactor": "108.33"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/2e5a15280d3f31f29a18a138636732a5/p_1500x1500/03261570000655-c1n1-s03.jpg",
      "nom": "La Goudale",
      "cl": 50,
      "tauxAlcool": 7.2,
      "prix": 3.58,
      "schlagFactor": "100.56"
    },
    {
      "imageUrl": "https://media.carrefour.fr/medias/35bc80ceb7b93a338f7d14b0fc287a24/p_1500x1500/05000213101223-a1n1-s24.jpg",
      "nom": "Guinness Brune Draught",
      "cl": 50,
      "tauxAlcool": 4.2,
      "prix": 2.09,
      "schlagFactor": "100.48"
    }
  ]

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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => { setDataBeerShlag([]); settSurPoto(false) }}>oui</button>
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
          {dataBeerShlag.length > 0 ?
            <div style={{ display: 'flex', flexDirection: "row-reverse", marginBottom: '10px' }}>
              <button onClick={() => settSurPoto(true)} className='button-vert'>supprimer les information</button>
            </div>
            :
            <div>
              <button onClick={() => setDataBeerShlag(defaudListe)} className='button-prelist'><p>Informations Bières Carrefour</p> <div style={{backgroundSize: 'cover', backgroundPosition: 'center',backgroundImage: 'url(https://images7.alphacoders.com/359/359942.jpg)'}}/></button>
            </div>

          }
          {dataBeerShlag.map((data, index) => (
            <div key={index} >

              <div className='stateConteneur' key={index}>
                <div className='img-and-top'>
                  {data.imageUrl === '' ?
                    <div style={{ height: '64px', width: '64px', backgroundColor: 'rgba(134, 134, 134, 0.28)', borderRadius: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p>NO</p>
                    </div>
                    :
                    <img alt='beerProfil' src={data.imageUrl} style={{ height: '64px', width: '64px' }}></img>
                  }
                  <h1 className='beer-top'><strong>{index + 1}</strong></h1>
                </div>
                <div className='nom-and-score'>
                  <h1 className='beer-name'><strong>{data.nom}</strong></h1>
                  <p className='beer-info'>{data.cl}CL | {data.tauxAlcool}% | {data.prix}€ {'->'} <strong>SF {data.schlagFactor}</strong></p>
                  <p className='phone-sf'>SF {data.schlagFactor}</p>
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
                      <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                        <button className='button-vert' style={{ margin: '10px' }} onClick={() => handleEdit(index)}>Save</button>
                        <button style={{ margin: '10px' }} onClick={() => setEditIndex(null)}>Annuler</button>
                        <button style={{ margin: '10px' }} onClick={() => { setDataBeerShlag(dataBeerShlag.filter((_, i) => index !== i)); setEditIndex(null) }}>Supprimer</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button className='button-edit' onClick={() => handleEditClick(index)}>Edit</button>
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
