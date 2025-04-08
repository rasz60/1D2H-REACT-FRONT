import DaumPostcode from "react-daum-postcode";

const AddrAPI = ({ setBackdrop, onSelect }) => {
  const handleComplete = (data) => {
    const { address, zonecode } = data;

    onSelect && onSelect({ address, zonecode });

    setBackdrop(false);
  };

  return <DaumPostcode onComplete={handleComplete} />;
};

export default AddrAPI;
