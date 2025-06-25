const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": ["warn"], // Change from "error" to "warn"
      "react/no-unescaped-entities": "off",
      "react/display-name": "off"
    },
  },
];

export default eslintConfig;
