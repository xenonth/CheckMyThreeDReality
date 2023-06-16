//test check for WebGL capability


if (WebGL.isWebGLAvailable() ) {

    //initate functions here
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('container').appendChild( warning );
}