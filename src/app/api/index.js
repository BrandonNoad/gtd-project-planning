// import Axios from 'axios';

// let axiosInstance = null;

// const teamId = 1;

// export const init = (jwt) => {
//     if (axiosInstance !== null) {
//         return;
//     }

//     const headers = { Authorization: `Bearer ${jwt}` };

//     axiosInstance = Axios.create({
//         baseURL: 'http://Brandons-MacBook-Air.local:3001/v1.0/',
//         headers
//     });
// };

// // date needs to be formatted as YYYY-MM-DD
// export const fetchScheduledRecipesForDay = (queryParams) =>
//     axiosInstance.get(`/teams/${teamId}/scheduledRecipes`, { params: queryParams });
