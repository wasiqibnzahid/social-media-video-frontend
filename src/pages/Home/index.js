import { useEffect, useRef, useState } from "react";

import { InputText, SubmitButton } from "../../components/atoms";
import {
  Success,
  Processing,
  Failed,
  Navbar,
} from "../../components/molecules";
import providerFunctions from "./ProviderFunctions";
const providerList = [
  {
    name: "Twitter",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553",
    color: "#0086fe",
  },
  {
    name: "Facebook",
    icon: "https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png",
    color: "#1877F2",
  },
  {
    name: "Instagram",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1024px-Instagram_logo_2022.svg.png",
    color:
      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
  },
  {
    name: "Pinterest",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
    color: "#E60023",
  },
];

function Home() {
  const [selectedProvider, setSelectedProvider] = useState(
    providerList[0].name
  );
  const [status, setStatus] = useState(null);
  const [data, setData] = useState({});
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const handleInput = (e) => {
    setUrl(e);
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      fetchTwitterVideo();
    }
  };

  const handleSubmit = () => {
    fetchTwitterVideo();
  };
  const intervalRef = useRef(15);
  function handleProgress() {
    setProgress(intervalRef.current);
    const interval = setInterval(() => {
      if (intervalRef.current < 80) {
        intervalRef.current += 15;
        setProgress(intervalRef.current);
      } else {
        clearInterval(interval);
      }
    }, 1500);
  }
  const fetchTwitterVideo = async () => {
    setStatus("processing");
    try {
      setProgress(15);
      intervalRef.current = 15;
      handleProgress();
      const data = await providerFunctions[selectedProvider](url);
      if (data.success === "true") {
        setData(data.data);
        intervalRef.current = 100;
        setTimeout(() => {
          setProgress(100);
        }, 1000);
        setStatus("success");
      } else {
        setData({ message: data.message });
        setStatus("failed");
      }
    } catch (e) {
      setData({ message: "Check Your Internet Connection" });
      setStatus("failed");
      console.error(e);
    }
  };
  useEffect(() => {
    setData({});
    setStatus("");
    setUrl("");
    intervalRef.current = 15;
    setProgress(15);
  }, [selectedProvider]);
  return (
    <div>
      <Navbar />

      <div className="container-md mt-4">
        <div className="row">
          <div
            className="row"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {providerList.map((provider) => (
              <div
                style={{
                  maxWidth: "5rem",
                  textAlign: "center",
                  margin: "1rem 0",
                }}
                className="provider-parent"
                key={provider.name}
              >
                <div
                  className={`provider-icon-container ${
                    provider.name === selectedProvider && "active"
                  }`}
                  onClick={() => {
                    setSelectedProvider(provider.name);
                    document.body.style.background = provider.color;
                  }}
                >
                  <img
                    style={{
                      maxWidth: "3rem",
                      height: "100%",
                    }}
                    alt=""
                    src={provider.icon}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-8 px-2 py-1">
            <InputText
              value={url}
              handleInput={handleInput}
              handleKeyPress={handleKeyPress}
            />
          </div>
          <div className="col-md-4 px-2 py-1">
            <SubmitButton disabled={url === ""} handleSubmit={handleSubmit} />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12 px-2">
            {status === "success" && <Success data={data} />}
            {status === "processing" && (
              <Processing completed={progress} color="green" />
            )}
            {status === "failed" && <Failed message={data.message} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
