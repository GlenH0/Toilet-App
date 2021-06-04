export async function getToilet(){
    let toiletData = await fetch('api/toilets/60a69edb016b594ea8d3e47a');
    let toiletJSONData = toiletData.json()
    return toiletJSONData
}

export async function getAllToilets(){
    let toiletData = await fetch('api/toilets');
    console.log(toiletData);
    let toiletJSONData = toiletData.json()
    return toiletJSONData
}



export async function patchToilet(toilet){
    let updatedToiletData = await fetch('api/toilets/60a69edb016b594ea8d3e47a', {
        method : 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(toilet)

    })

    let updatedToiletDataJSON = updatedToiletData.json()
    return updatedToiletDataJSON
}


export async function postToilet(toilet){
    let updatedToiletData = await fetch('api/toilets', {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(toilet)

    })

    let updatedToiletDataJSON = updatedToiletData.json()
    return updatedToiletDataJSON
}

