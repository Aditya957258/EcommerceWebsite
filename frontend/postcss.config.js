export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},

    // =====================================
    // PRODUCTION OPTIMIZATION PLUGINS (OPTIONAL)
    // =====================================

    ...(process.env.NODE_ENV === "production"
      ? {
          cssnano: {
            preset: [
              "default",
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          },
        }
      : {}),
  },
}