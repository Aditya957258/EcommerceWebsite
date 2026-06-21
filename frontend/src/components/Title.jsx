import React from 'react'

const Title = ({
    text1 = "",
    text2 = "",
    variant = "section",   // page | section | subtitle
    underline = true,
    align = "left",
    className = ""
}) => {

    // -----------------------------
    // DESIGN SYSTEM TYPOGRAPHY
    // -----------------------------
    const styles = {
        page: "text-2xl sm:text-3xl font-bold text-gray-800",
        section: "text-lg sm:text-xl font-semibold text-gray-700",
        subtitle: "text-sm sm:text-base font-medium text-gray-600"
    }

    // -----------------------------
    // SEMANTIC TAG (SEO READY)
    // -----------------------------
    const Tag =
        variant === "page"
            ? "h1"
            : variant === "section"
                ? "h2"
                : "h3"

    return (
        <div
            className={`flex items-center gap-3 mb-4 ${
                align === "center" ? "justify-center" : "justify-start"
            } ${className}`}
        >

            {/* TITLE TEXT */}
            <Tag className={styles[variant]}>
                <span className="text-gray-500 font-normal">
                    {text1}
                </span>

                <span className="text-gray-800 font-semibold ml-1">
                    {text2}
                </span>
            </Tag>

            {/* UNDERLINE (OPTIONAL) */}
            {underline && (
                <div className="flex-1">
                    <div className="h-[2px] w-10 sm:w-16 bg-gradient-to-r from-gray-700 to-transparent rounded-full"></div>
                </div>
            )}

        </div>
    )
}

export default Title