import React from "react";

//Components
import Button from "./Button";
import "./Login.css";

//Styling
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import ToggleButton from "@mui/material/ToggleButton";


function Login(props) {
  return (
    <div className="login__page__background">
      <svg
        id="shape__container"
        width="649"
        height="377"
        viewBox="0 0 600 320"
        fill="001122"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0)">
          <path d="M619 0H-30V377H619V0Z" fill="#001122" />
          <path
            d="M-30 206.722L13.2667 219.917L56.5333 219.288L99.8 216.147L143.067 230.598L186.333 229.342L229.6 228.713L272.867 229.342L316.133 228.085L359.4 219.917L402.667 205.465L445.933 229.97L489.2 231.855L532.467 225.572L575.733 207.978L619 226.2V377.628H575.733H532.467H489.2H445.933H402.667H359.4H316.133H272.867H229.6H186.333H143.067H99.8H56.5333H13.2667H-30V206.722Z"
            fill="#6600FF"
          />
          <path
            d="M-30 233.74L13.2667 241.908L56.5333 238.767L99.8 227.457L143.067 232.483L186.333 226.828L229.6 230.598L272.867 246.935L316.133 235.625L359.4 250.705L402.667 226.2L445.933 228.713L489.2 241.28L532.467 229.97L575.733 238.138L619 226.2V377.628H575.733H532.467H489.2H445.933H402.667H359.4H316.133H272.867H229.6H186.333H143.067H99.8H56.5333H13.2667H-30V233.74Z"
            fill="#A700E3"
          />
          <path
            d="M-30 263.272L13.2667 260.758L56.5333 248.82L99.8 255.732L143.067 256.36H186.333L229.6 263.9L272.867 255.732H316.133L359.4 267.042L402.667 256.36L445.933 250.077L489.2 255.103L532.467 255.732L575.733 260.758L619 254.475V377.628H575.733H532.467H489.2H445.933H402.667H359.4H316.133H272.867H229.6H186.333H143.067H99.8H56.5333H13.2667H-30V263.272Z"
            fill="#CB00CA"
          />
          <path
            d="M-30 274.582L13.2667 271.44L56.5333 284.007H99.8L143.067 280.865L186.333 282.75L229.6 275.21L272.867 267.042L316.133 284.635L359.4 270.812L402.667 283.378H445.933L489.2 267.042L532.467 276.467L575.733 275.838L619 282.75V377.628H575.733H532.467H489.2H445.933H402.667H359.4H316.133H272.867H229.6H186.333H143.067H99.8H56.5333H13.2667H-30V274.582Z"
            fill="#E100B3"
          />
          <path
            d="M-30 302.857L13.2667 292.175L56.5333 293.432L99.8 300.343L143.067 289.033L186.333 287.148L229.6 292.175L272.867 293.432L316.133 294.06L359.4 299.715L402.667 300.343L445.933 293.432L489.2 298.458L532.467 290.29L575.733 290.918L619 297.202V377.628H575.733H532.467H489.2H445.933H402.667H359.4H316.133H272.867H229.6H186.333H143.067H99.8H56.5333H13.2667H-30V302.857Z"
            fill="#EE009F"
          />
          <path
            d="M-30 319.193L13.2667 318.565L56.5333 313.538L99.8 311.025L143.067 311.653L186.333 316.68L229.6 319.822L272.867 317.937L316.133 306.627L359.4 308.512L402.667 315.423L445.933 310.397L489.2 311.653L532.467 311.025L575.733 308.512L619 321.078V377.628H575.733H532.467H489.2H445.933H402.667H359.4H316.133H272.867H229.6H186.333H143.067H99.8H56.5333H13.2667H-30V319.193Z"
            fill="#F7008C"
          />
          <path
            d="M-30 326.733L13.2667 332.388L56.5333 334.273L99.8 329.247L143.067 329.875L186.333 329.247L229.6 327.362L272.867 336.787L316.133 330.503L359.4 329.875L402.667 338.043L445.933 330.503L489.2 326.105L532.467 334.902L575.733 332.388L619 338.672V377.628H575.733H532.467H489.2H445.933H402.667H359.4H316.133H272.867H229.6H186.333H143.067H99.8H56.5333H13.2667H-30V326.733Z"
            fill="#FD0079"
          />
          <path
            d="M-30 349.982L13.2667 346.212L56.5333 356.265L99.8 348.097L143.067 351.867L186.333 352.495L229.6 354.38L272.867 353.752L316.133 349.353L359.4 349.982L402.667 348.097L445.933 349.353L489.2 348.097L532.467 356.265L575.733 353.123L619 347.468V377.628H575.733H532.467H489.2H445.933H402.667H359.4H316.133H272.867H229.6H186.333H143.067H99.8H56.5333H13.2667H-30V349.982Z"
            fill="#FF0066"
          />
        </g>
      </svg>
      <div className="xchange__logo">
      <svg
              id="login__logo"
              width="733"
              height="109"
              viewBox="0 0 733 109"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M83.9793 105L49.2753 58.344L14.7153 105H6.07532L44.8113 53.016L8.81132 4.19998H17.4513L49.5633 47.544L81.6753 4.19998H89.8833L53.8833 52.872L92.6193 105H83.9793Z"
                stroke="#A700E3"
                stroke-width="4"
                mask="url(#path-1-outside-1)"
              />
              <path
                d="M152.122 105.72C142.234 105.72 133.306 103.512 125.338 99.096C117.466 94.68 111.226 88.584 106.618 80.808C102.106 73.032 99.8497 64.296 99.8497 54.6C99.8497 44.904 102.106 36.168 106.618 28.392C111.226 20.616 117.466 14.52 125.338 10.104C133.306 5.68798 142.234 3.47998 152.122 3.47998C159.418 3.47998 166.138 4.67998 172.282 7.07998C178.426 9.38398 183.658 12.84 187.978 17.448L183.37 22.2C175.306 14.232 164.986 10.248 152.41 10.248C143.962 10.248 136.282 12.168 129.37 16.008C122.458 19.848 117.034 25.176 113.098 31.992C109.162 38.712 107.194 46.248 107.194 54.6C107.194 62.952 109.162 70.536 113.098 77.352C117.034 84.072 122.458 89.352 129.37 93.192C136.282 97.032 143.962 98.952 152.41 98.952C164.89 98.952 175.21 94.92 183.37 86.856L187.978 91.608C183.658 96.216 178.378 99.72 172.138 102.12C165.994 104.52 159.322 105.72 152.122 105.72Z"
                stroke="#A700E3"
                stroke-width="4"
                mask="url(#path-1-outside-1)"
              />
              <path
                d="M294.656 4.19998V105H287.312V57.048H219.92V105H212.576V4.19998H219.92V50.568H287.312V4.19998H294.656Z"
                stroke="#A700E3"
                stroke-width="4"
                mask="url(#path-1-outside-1)"
              />
              <path
                d="M392.209 76.632H333.745L320.929 105H313.009L359.377 4.19998H366.721L413.089 105H405.169L392.209 76.632ZM389.473 70.44L362.977 12.264L336.625 70.44H389.473Z"
                stroke="#A700E3"
                stroke-width="6"
                mask="url(#path-1-outside-1)"
              />
              <path
                d="M513.468 4.19998V105H507.42L438.732 17.448V105H431.388V4.19998H437.58L506.124 91.752V4.19998H513.468Z"
                stroke="#A700E3"
                stroke-width="4"
                mask="url(#path-1-outside-1)"
              />
              <path
                d="M620.67 55.032H627.726V92.76C623.31 96.984 617.934 100.2 611.598 102.408C605.358 104.616 598.734 105.72 591.726 105.72C581.742 105.72 572.718 103.512 564.654 99.096C556.686 94.68 550.398 88.584 545.79 80.808C541.278 73.032 539.022 64.296 539.022 54.6C539.022 44.904 541.278 36.168 545.79 28.392C550.398 20.616 556.686 14.52 564.654 10.104C572.718 5.68798 581.79 3.47998 591.87 3.47998C599.262 3.47998 606.03 4.67998 612.174 7.07998C618.414 9.38398 623.742 12.792 628.158 17.304L623.55 22.2C619.326 17.976 614.574 14.952 609.294 13.128C604.11 11.208 598.35 10.248 592.014 10.248C583.374 10.248 575.55 12.168 568.542 16.008C561.63 19.848 556.206 25.176 552.27 31.992C548.334 38.712 546.366 46.248 546.366 54.6C546.366 62.856 548.334 70.392 552.27 77.208C556.302 83.928 561.774 89.256 568.686 93.192C575.598 97.032 583.374 98.952 592.014 98.952C603.534 98.952 613.086 95.88 620.67 89.736V55.032Z"
                stroke="#A700E3"
                stroke-width="4"
                mask="url(#path-1-outside-1)"
              />
              <path
                d="M729.597 98.376V105H660.045V4.19998H727.437V10.824H667.389V50.568H721.101V57.048H667.389V98.376H729.597Z"
                stroke="#A700E3"
                stroke-width="4"
                mask="url(#path-1-outside-1)"
              />
            </svg>
            <div className="xchange__phrase">
                Changing the way you buy property.
            </div>
      </div>
      <div className="login__form__pane">
        <div className="login__form__inner__div">   
          <div className="login__form__title">
            Log in
          </div>
          <div className="login__credentials">
            <TextField
              className="login__form__username"
              id="outlined-disabled"
              label="Username"
              variant="outlined"
            />
            <TextField
              className="login__form__password"
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
            />
            <ToggleButton
              className="login__form__google__sign__in"
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              onClick={props.signInWithGoogle}
            >
              Sign in with Google
            </ToggleButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;