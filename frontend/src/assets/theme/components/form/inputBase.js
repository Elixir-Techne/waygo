// Argon Dashboard 2 MUI Base Styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

const { dark } = colors;
const { borderRadius } = borders;

const inputBase = {
  styleOverrides: {
    root: {
      //   display: "flex !important",
      //   alignItems: "center !important",
      //   height: "auto !important",
      // padding: `${pxToRem(8)} ${pxToRem(12)}`,
      // fontSize: `${size.sm} !important`,
      //   fontWeight: `${fontWeightRegular} !important`,
      //   lineHeight: "1.4 !important",
      //   color: "`${grey[700]} !important`",
      //   backgroundColor: `${white.main} !important`,
      //   backgroundClip: "padding-box !important",
      //   border: `${borderWidth[1]} solid ${inputColors.borderColor.main}`,
      appearance: "none !important",
      borderRadius: borderRadius.md,
      transition:
        "box-shadow 150ms ease, border-color 150ms ease, padding 150ms ease !important",
    },

    input: {
      width: "100% !important",
      // height: pxToRem(25),
      // paddingTop: "0 !important",
      // paddingRight: "0 !important",
      // paddingBottom: "0 !important",
      // paddingLeft: pxToRem(6),

      "&::-webkit-input-placeholder": {
        color: `${dark.main} !important`,
      },
    },
  },
};

export default inputBase;
