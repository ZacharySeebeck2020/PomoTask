import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientSafeProvider, getProviders, getSession, signIn } from "next-auth/react";

export default function Login({ providers }) {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen">
            <img src="/icon.png" className="h-64 aspect-square" />
            <h1 className="text-2xl my-10">Welcome To PomoTask</h1>
            {Object.values(providers).map((provider: ClientSafeProvider) => {
                if (provider.name === "GitHub") {
                    return <button className="bg-black p-3 rounded-lg" key={provider.id} onClick={() => {signIn(provider.id)}}><FontAwesomeIcon icon={faGithub}/> Sign In With GitHub</button>
                }
            })}
        </div>
    );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }

  return {
    props: {
        providers: await getProviders()
    }
  }
}