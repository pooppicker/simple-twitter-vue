import Swal from 'sweetalert2'
import axios from 'axios'
const baseURL = 'https://twitter-apis-demo.herokuapp.com/api'

export const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000
})

export const apiHelper = axios.create({
  baseURL
})