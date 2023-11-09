import axios from "axios";
import {playerBaseUrl} from "@/constants/urls";

export const playerInstance = axios.create({baseURL: playerBaseUrl});

