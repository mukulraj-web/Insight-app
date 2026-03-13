export function opportunityScore(result: any) {
    // console.log('opportunityScore input:', result); // Debug log

    let competition_index = result.averageRating * result.averageReviewCount
    type competion_level = "low" | "medium" | "high"
    let competion : competion_level;
    if(competition_index < 2000){
         competion = "low"
    }
    else if(competition_index < 10000){
        competion = "medium"
        }
    else {
        competion = "high"
    }
    let demandConst = 0;
    let competitionScore = 0;
    let priceScore = 0;
    if(result.averageReviewCount > 2000){
        demandConst = 4
    }
    else if( result.averageReviewCount >  1000){
        demandConst = 3
    }
    else if(result.averageReviewCount > 500){
        demandConst = 2
    }
    else {
    demandConst = 1
    }
    if(result.averageRating < 4.2){
        competitionScore = 3
    }
    else if(result.averageRating < 4.5){
        competitionScore = 2
    }
    else {
        competitionScore = 1
    }
    // console.log('averagePrice:', result.averagePrice); // Debug log
    if(result.averagePrice > 4000){
        priceScore = 3
    }
    else if(result.averagePrice > 2500){
        priceScore = 2
    }
    else {
        priceScore = 1
    }
    let opportunity_score  = demandConst + competitionScore + priceScore

    let response = {
        competition_level: competion,
        opportunity_scr: opportunity_score
    }
    // console.log('opportunityScore output:', response); // Debug log
    return response
}