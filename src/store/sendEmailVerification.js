async function sendVerificationEmail(email, displayName) {
  const res = await fetch(
    "https://us-central1-bobostore-3aabe.cloudfunctions.net/app/api/v1/users/verifyEmail",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        displayName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resBody = await res.json();
  if (res.status !== 200) {
    throw Error(resBody.message);
  }

  return resBody;
}

export default sendVerificationEmail;
