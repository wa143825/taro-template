const range = (size) =>
    Object.fromEntries(
        [...Array(size).keys()]
            .slice(1)
            .map((i) => [`${i}_${size}`, `${(i / size) * 100}%`])
    );

module.exports = {
  prefixer: false,
  separator: "_",
  compile: false,
  globalUtility: false,
  darkMode: "media",
  corePlugins: {
    preflight: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
    space: false,
    placeholderColor: false,
    placeholderOpacity: false,
  },
  exclude: [/([0-9]{1,}[.][0-9]*)$/],
  theme: {
    colors: {
      min: '#920929'
    },
    boxShadow: {
      'md': '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)', // above shadow
      'mdb': '0 4px 20px -1px rgba(0, 0, 0, 0.1), 0 2px 10px -1px rgba(0, 0, 0, 0.06)' // under shadow
    },
    borderRadius: {
      circle: '50%',
    },
    backgroundColor: () => ({
      primary: '#920926', // dark red
      black: '#000', // dark red
      gary1: '#f3f3f3', // light gray
      gary2: '#555555', // darken gray
      white: '#fff', // light gray
      transparent: 'rgba(0,0,0,.5)', // light gray
    }),
    width: (theme) => ({
        auto: "auto",
        full: "100%",
        screen: "100vw",
        ...Object.assign(...[2, 3, 4, 5, 6, 12].map(range)),
        ...theme("spacing"),
    }),
    height: (theme) => ({
        auto: "auto",
        full: "100%",
        screen: "100vh",
        ...Object.assign(...[2, 3, 4, 5, 6, 12].map(range)),
        ...theme("spacing"),
    }),
    maxHeight: {
        full: "100%",
        screen: "100vh",
    },
    textColor: {
      primary: '#920926', // dark red
      white: 'white',
      gary: '#ccc',
      black: '#000'
    },
    borderColor: () => ({
      black: '#000',
      white: '#fff',
    }),
  },
  shortcuts: {
    'row-c': 'flex items-center justify-center', // horizantal center
    'row-lc': 'flex items-center justify-start', // vertial center
    'col-c': 'flex flex-col items-center justify-center', // vertial center
    'border-b': 'border border-black border-solid',
    'border-w': 'border border-white border-solid',
    'line': 'w-full h-2rpx bg-gary1 my-30rpx'
  },
};
