module.exports = {
    '*.{js,jsx,ts,tsx}': [
        <#if prettier == "true">"npm run prettier",</#if>
        <#if eslint == "true">"npm run eslint",</#if>
        <#if jest == "true">"npm run test"</#if>
    ]
}