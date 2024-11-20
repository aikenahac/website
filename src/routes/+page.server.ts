import axios from "axios";
import type { LayoutServerLoad } from "./$types";
import { SECRET_SPOTIFY_CLIENT_ID, SECRET_SPOTIFY_CLIENT_SECRET } from '$env/static/private';

interface Token {
  access_token: string;
}

export const load: LayoutServerLoad = async () => {
  let nowPlaying;

  try {
    
  } catch (e) {
    console.log(e);
  }


  return {
    nowPlaying,
  }
}