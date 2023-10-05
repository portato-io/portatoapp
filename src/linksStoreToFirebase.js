import {
  ref,
  onValue,
  get,
  set,
  update,
  query,
  orderByChild,
  equalTo,
  serverTimestamp,
} from 'firebase/database';
import { database } from './firebaseConfig';
import { setObjectId, setReqUid } from './Store/actions/requestActionCreators';
import { setRouteId, setRouteUid } from './Store/actions/routeActionCreators';
import { setDealId } from './Store/actions/dealActionCreators';
import { store } from './index';
import { push as firebasePush } from 'firebase/database';

export const uploadRequestToFirebase = async (uid, dispatch) => {
  try {
    dispatch(setReqUid(uid));

    let state = store.getState();

    // Create a copy of the request and replace undefined values
    const requestCopy = { ...state.request };
    if (requestCopy.images === undefined) {
      requestCopy.images = []; // use an empty array as the default value
    }

    if (state.request.id === '0') {
      // Get the database instance and create a reference to the user's requests
      const requestsRef = ref(database, `users/${uid}/requests`);
      // Generate a new unique key for the request
      const newRequestRef = firebasePush(requestsRef);

      // The unique key is now available as newRequestRef.key
      if (newRequestRef.key) {
        dispatch(setObjectId(newRequestRef.key));
        state = store.getState();
        // Update your data under the new key
        requestCopy.id = newRequestRef.key;
        await set(newRequestRef, requestCopy);

        console.log('Request uploaded successfully');
        return true;
      } else {
        console.error('Unable to generate a unique key.');
        return false;
      }
    } else {
      console.log('Request ID already exists, updating request');
      const requestsRef = ref(
        database,
        `users/${uid}/requests/${state.request.id}`
      );
      await update(requestsRef, requestCopy);
      console.log('Request updated successfully');
      return true;
    }
  } catch (error) {
    console.error('Error uploading request:', error);
    return false;
  }
};

export const uploadRouteToFirebase = async (uid, dispatch) => {
  try {
    dispatch(setRouteUid(uid));
    let state = store.getState();

    // Ensure the days property is an empty array if it is undefined
    state.route.days = state.route.days ?? [];

    if (state.route.id === '0') {
      // Get the database instance and create a reference to the user's routes
      const routesRef = ref(database, `users/${uid}/routes`);
      // Generate a new unique key for the route
      const newRouteRef = firebasePush(routesRef);

      // The unique key is now available as newRouteRef.key
      if (newRouteRef.key) {
        dispatch(setRouteId(newRouteRef.key));
        state = store.getState();
        await set(newRouteRef, state.route);
      } else {
        console.error('Unable to generate a unique key.');
      }
    } else {
      console.log('Route ID already exists, updating route');
      const routesRef = ref(database, `users/${uid}/routes/${state.route.id}`);
      await update(routesRef, state.route);
      console.log('Route updated successfully');
    }
  } catch (error) {
    console.error('Error uploading route: ', error);
  }
};

export const fetchDataOnce = async (uid, directory) => {
  try {
    const userRequestsRef = ref(database, `users/${uid}/${directory}`);
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data found.', userRequestsRef);
      return {}; // return an empty object if no data is found
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const fetchGeoData = async (uid, directory) => {
  try {
    const geoDataRef = ref(database, `users/${uid}/${directory}`);
    const snapshot = await get(geoDataRef);
    if (snapshot.exists()) {
      console.log('Data: ', snapshot.val());
      /*
      const parsedData = [];
      const dataObject = snapshot.val();
      console.log(typeof dataObject)
      for(let data in )
      return parsedData;
      */
    } else {
      console.log('No data found.', geoDataRef);
      return {};
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const checkData = async (uid, directory, data_id) => {
  try {
    const userRequestsRef = ref(
      database,
      `users/${uid}/${directory}/${data_id}`
    );
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return true;
    } else {
      console.log('No data found.', userRequestsRef);
      return false;
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const uploadDealToFirebase = async (dispatch) => {
  try {
    // Get the database instance and create a reference to the user's requests
    const requestsRef = ref(database, 'deals');

    const newRequestRef = firebasePush(requestsRef);

    // The unique key is now available as newRequestRef.key
    if (newRequestRef.key) {
      dispatch(setDealId(newRequestRef.key));
      const state = store.getState();

      // Update your data under the new key
      await set(newRequestRef, state.deal);
      return newRequestRef.key;
    } else {
      console.error('Unable to generate a unique key.');
    }
  } catch (error) {
    console.error('Error creating suggestions: ', error);
  }
};

export const listenForDataChanges = () => {
  const reduxStoreRef = ref(database, 'reduxStore');

  onValue(
    reduxStoreRef,
    (snapshot) => {
      if (snapshot.exists()) {
        console.log('Data:', snapshot.val());
      } else {
        console.log('No data found.', userRequestsRef);
      }
    },
    (error) => {
      console.error('Error fetching data from Firebase:', error);
    }
  );
};

export const addNotificationsToken = async (uid, token) => {
  try {
    // Get the database instance and create a reference to the user's tokens
    const tokensRef = ref(database, `users/${uid}/tokens`);

    // Get the current tokens
    const snapshot = await get(tokensRef);
    let currentTokens = snapshot.exists() ? snapshot.val() : [];

    // Check if the token already exists in the array
    if (!currentTokens.includes(token)) {
      // Add the new token to the array
      currentTokens.push(token);

      // Update the tokens in the database
      await set(tokensRef, currentTokens);
      console.log('Successfully added the token ');
    }
  } catch (error) {
    console.error('Error adding token: ', error);
  }
};

export const getUserTokens = async (uid) => {
  try {
    const userRequestsRef = ref(database, `users/${uid}/tokens`);
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data found.', userRequestsRef);
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const checkTokenExists = async (uid) => {
  try {
    const userRequestsRef = ref(database, `users/${uid}/token`);
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return true;
    } else {
      console.log('No data found.', userRequestsRef);
      return false;
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const fetchDeals = async (uid) => {
  try {
    const dealsRef = ref(database, 'deals');
    const dealsQuery = query(dealsRef, orderByChild('route/uid'), equalTo(uid));
    const snapshot = await get(dealsQuery);

    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data found for uid: ', uid);
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

export const fetchAdressRequest = async (uid, id) => {
  try {
    const userRequestsRef = ref(database, `users/${uid}/requests/${id}`);
    const snapshot = await get(userRequestsRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data found.', userRequestsRef);
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};

/**
 * Updates the request status
 *
 * @param {string} object_uid - The uid of the object
 * @param {string} request_id - The id of the object
 * @param {string} status - The new status
 * @param {string} object - The name of the object type
 * @return {Promise} A promise that resolves with no value
 */
export const updateObjectStatus = (object_uid, object_id, status, object) => {
  return new Promise((resolve, reject) => {
    try {
      const dealRef = ref(
        database,
        'users/' + object_uid + `/${object}/` + object_id
      );
      if (object == 'requests') {
        update(dealRef, { status: status })
          .then(() => {
            console.log('Successfully updated request status ' + dealRef);
            resolve();
          })
          .catch((error) => {
            console.error('Error updating request status :', error);
            reject(error);
          });
      } else if (object == 'routes') {
        update(dealRef, { routeStatus: status })
          .then(() => {
            console.log('Successfully updated route status ' + dealRef);
            resolve();
          })
          .catch((error) => {
            console.error('Error updating route status :', error);
            reject(error);
          });
      }
    } catch (error) {
      console.error('Error updating object status :', error);
      reject(error);
    }
  });
};

export const checkPreviousRoutes = async (requestId, routeId) => {
  try {
    // Create a reference to the deals
    const dealsRef = ref(database, 'deals');

    // Get a snapshot of all deals
    const snapshot = await get(dealsRef);

    // If snapshot exists, check if there's any deal with the matching requestId and routeId
    if (snapshot.exists()) {
      const deals = snapshot.val();
      for (let key in deals) {
        if (
          deals[key].request.id === requestId &&
          deals[key].route.id === routeId
        ) {
          console.log(
            'Deal already exists with the provided request and route IDs.'
          );
          return false;
        }
      }
    }

    console.log('No deals found with the provided request and route IDs.');
    return true;
  } catch (error) {
    console.error('Error checking previous routes: ', error);
    throw error; // You might want to handle the error more gracefully
  }
};

export const updateRequestDealId = async (request, dealId) => {
  try {
    const dealRef = ref(
      database,
      'users/' + request.uid + '/requests/' + request.id
    );
    await update(dealRef, { dealId: dealId });

    console.log('Successfully updated request dealId ' + dealRef);
  } catch (error) {
    console.error('Error updating request dealId :', error);
  }
};

export const fetchRouteUidFromDeal = async (dealId) => {
  if (!dealId) {
    console.error('No dealId provided');
    return null;
  }
  try {
    const dealRef = ref(database, `deals/${dealId}/route`);
    const snapshot = await get(dealRef);
    if (snapshot.exists()) {
      const routeData = snapshot.val();
      return routeData.uid; // Return the uid of the route
    } else {
      console.log('No such deal!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching route info: ', error);
  }
};

export const addContactTimestamp = async (request_uid, request_id) => {
  try {
    const dealRef = ref(
      database,
      'users/' + request_uid + '/requests/' + request_id
    );

    // Write the timestamp placeholder to the database
    await update(dealRef, { addContactTimestamp: serverTimestamp() });

    // Read the actual timestamp from the database
    const snapshot = await get(dealRef);
    const data = snapshot.val();
    const timestamp = data.addContactTimestamp;

    if (!Number.isInteger(timestamp)) {
      throw new Error(`Invalid timestamp: ${timestamp}`);
    }

    // Convert to JavaScript Date object
    const date = new Date(timestamp);
    // Convert to string in ISO format
    const dateString = date.toISOString();

    await update(dealRef, { contactTimestamp: dateString });

    console.log('Successfully updating timestamp  ' + dealRef);
  } catch (error) {
    console.error('Error updating request timestamp :', error);
  }
};

export const fetchSpecificObjects = async (objectPath) => {
  try {
    const userObjectRef = ref(database, `${objectPath}`);
    const snapshot = await get(userObjectRef);
    if (snapshot.exists()) {
      console.log('Data:', snapshot.val());
      return snapshot.val();
    } else {
      console.log('No data found.', userObjectRef);
      return {}; // return an empty object if no data is found
    }
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
};
