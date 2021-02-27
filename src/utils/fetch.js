import {CHANNELS, MESSAGES} from "../dummyData";
import {API} from '../config';

let counter = 0;

export async function getChannels() { //get update with long polling
  //return await fetch(API + "/channels")
  //  .then(res => res.json().channels);

  CHANNELS[1].lastMessage = ++counter;

  if (counter > 1) {
    return await new Promise((res, rej) => {
      setTimeout(() => {
        res(CHANNELS);
      }, 10000);
    });
  };
 
  return await CHANNELS;
};

export async function getMessages(channel, limit = 100, from = 0) {
  //return await fetch(API + `/messages?channel=${channel}&limit=${limit}&from=${from}`)
  //  .then(res => res.json());
  const res = {
    prod: MESSAGES.prod,
    misc: [{...MESSAGES.misc[0], id: counter}]
  };
  return await res[channel];
};

/*
TO DO
Fetch class with standart output and error handling
*/
