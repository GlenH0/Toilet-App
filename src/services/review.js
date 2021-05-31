export async function getReview(){
    let reviewData = await fetch('/api/reviews/')
    let reviewJSONData = reviewData.json()
    return reviewJSONData
}