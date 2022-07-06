async function sendPasswordReset(email) {
    const res = await fetch(
      "https://us-central1-bobostore-3aabe.cloudfunctions.net/app/api/v1/users/resetPassword",
      {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resBody = await res.json();
    if (res.status !== 200) {
    //   throw Error(resBody.message);
      return resBody;
    }
  
    return resBody;
  }
  
  export default sendPasswordReset;
  