import './PageNotFound.css'

export function PageNotFound(){
  return(
    <div className="error-404">
      <img className='error-image' src='./sad-face.svg'></img>
      <div className='container-error'>
        <p className='error-title'> 404</p> 
        <p className='error-description'>Page Not Found</p>
      </div>
    </div>
  );
}