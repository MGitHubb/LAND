import {Cloudinary} from "@cloudinary/url-gen";

export const cld = new Cloudinary({
  cloud: {
    cloudName: 'dk1dn6wvk'
  }
});

export const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
      title: 'Cottage',
      id: 1
    },
    {
      img: 'https://images.unsplash.com/photo-1582460570774-705b63c1bc56?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
      title: 'Sunset',
      id: 2
    },
    {
      img: 'https://images.unsplash.com/photo-1603470458359-ea7c7d60a51a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
      title: 'Road',
      id: 3
    },
    {
      img: 'https://images.unsplash.com/photo-1583699998579-5872a2117151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80',
      title: 'Overview',
      id: 4
    }
];

export const center = {
  lat: 45.9432,
  lng: 24.9668
};

export const options ={
  draggable: true,
  clickable: true
}

export const containerStyle = {
  minWidth: '300px',
  minHeight: '400px',
  maxWidth: '700px',
  maxHeight: '400px'
};
  
