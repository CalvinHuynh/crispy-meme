/**
 * Generates an alphanumeric email
 * @param prefixSize the prefix length of the email e.g. ('aaa....@')
 * @param postFixSize the postfix length of the email e.g. ('...@aaa.')
 */
export function GenerateEmail(prefixSize = 12, postFixSize = 5) {

    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let emailPreFix = '';
    let emailPostFix = '';
    let emailTopLevelDomain = '';

    const emailPrefixSize = Math.floor(Math.random() * Math.floor(prefixSize));
    const emailPostfixSize = Math.floor(Math.random() * Math.floor(postFixSize));

    // Generates a domain length between size 2 and 4
    const emailDomainLength = Math.floor(Math.random() * Math.floor(2) + 2);

    // Generate a random prefix for the email
    for (let i = 0; i < emailPrefixSize; i++)
        emailPreFix += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));

    // Generate a random postfix for the email
    for (let i = 0; i < emailPostfixSize; i++)
        emailPostFix += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));

    // Generate a random top level domain for the email
    for (let i = 0; i < emailDomainLength; i++)
        emailTopLevelDomain += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));

    return emailPreFix + '@' + emailPostFix + '.' + emailTopLevelDomain;
}

/**
 * Generates an alphanumeric username
 * @param usernameSize length of the username
 */
export function GenerateUsername(usernameSize = 10) {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let username = '_DEV_';

    for (let i = 0; i < usernameSize; i++)
      username += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));

    return username;
}