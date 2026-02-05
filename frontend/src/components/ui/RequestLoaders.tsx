import type { JSX } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import LoaderSpinner from "../../assets/roima.svg";

const LoadingIndicator = (): false | JSX.Element => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    !promiseInProgress && (
      <div style={styles.loaderContainer}>
        {}
        <div style={styles.loaderContainerSpinner}>
          <div style={{...styles.loader, ...styles.loader1}}></div>
          <div style={{...styles.loader, ...styles.loader2}}></div>
          <div style={{...styles.loader, ...styles.loader3}}></div>
          <div style={{...styles.loader, ...styles.loader4}}></div>
          <div style={styles.loaderImage}>
            <img src={LoaderSpinner} style={styles.image} alt="Loading" />
          </div>
        </div>
      </div>
    )
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column' as const,
    position: 'fixed' as const,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '100vh',
    width: '100%',
    zIndex: 1111111,
    backdropFilter: 'blur(10px)',
  },
  loaderContainerSpinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' as const,
    width: '150px',
    height: '150px',
  },
  loader: {
    position: 'absolute' as const,
    border: '1px solid transparent',
    borderRadius: '50%',
    borderTopColor: '#1d8cbe',
    animation: 'loaderSpinner 2s linear infinite',
  },
  loader1: {
    animationDuration: '4s',
    width: '140px',
    height: '140px',
  },
  loader2: {
    animationDuration: '2s',
    width: '120px',
    height: '120px',
  },
  loader3: {
    animationDuration: '1s',
    width: '100px',
    height: '100px',
  },
  loader4: {
    animationDuration: '0.5s',
    width: '80px',
    height: '80px',
  },
  loaderImage: {
    width: '60px',
    height: '60px',
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
    verticalAlign: 'middle' as const,
  },
};

// Add keyframe animation to the component
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes loaderSpinner {
    to {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(styleSheet);

export default LoadingIndicator;