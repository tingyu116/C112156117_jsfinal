import { useState } from "react";
import { FaStar,FaPhoneAlt, FaClock, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export function Services() {
  return (
<div className="section" style={{ maxWidth: 600, margin: "20px auto", padding: 20, backgroundColor: "#f9f9f9", borderRadius: 8 }}>
      <h2 style={{ color: "#5CADAD", marginBottom: 15 }}>我們的服務</h2>
      <p>風景雜貨店專為你提供以下服務，讓你感受不一樣的生活體驗：</p>

      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        <li><strong>故事選購諮詢：</strong>根據你的興趣推薦專屬故事與商品。</li>
        <li><strong>線上導覽服務：</strong>帶你深入每件商品背後的故事。</li>
        <li><strong>專人客服：</strong>隨時解答你的疑問與需求。</li>
      </ul>

      <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 15, color: "#5CADAD", fontWeight: "bold" }}>
        <FaPhoneAlt /> <a href="tel:0912345678" style={{ color: "#5CADAD", textDecoration: "none" }}>客服專線：0912-345-678</a>
      </div>
      <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 15, color: "#5CADAD", fontWeight: "bold" }}>
        <FaClock /> <span>服務時間：週一至週五 09:00 - 18:00</span>
      </div>
    </div>
  );
}

export function Contact() {
return (
    <div className="section" style={{ maxWidth: 600, margin: "20px auto", padding: 20, backgroundColor: "#fff8f0", borderRadius: 8, boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ color: "#5CADAD", marginBottom: 15 }}>聯絡我們</h2>
      <p>需要即時反饋或有任何疑問？歡迎使用以下方式聯繫我們！</p>

      <div style={{ marginBottom: 15 }}>
        <FaPhoneAlt style={{ marginRight: 8, color: "#5CADAD" }} />
        <a href="tel:0900000000" style={{ color: "#5CADAD", textDecoration: "none", fontWeight: "bold" }}>0900-000-000</a>
      </div>

      <div style={{ marginBottom: 15 }}>
        <FaEnvelope style={{ marginRight: 8, color: "#5CADAD" }} />
        <a href="mailto:C112156117@shop.com" style={{ color: "#5CADAD", textDecoration: "none", fontWeight: "bold" }}>C112156117@shop.com</a>
      </div>

      <div style={{ marginBottom: 15 }}>
        <FaMapMarkerAlt style={{ marginRight: 8, color: "#5CADAD" }} />
        <span>高雄市燕巢區</span>
      </div>
      <div style={{ margin: "20px 0", borderRadius: 8, overflow: "hidden", boxShadow: "0 0 6px rgba(0,0,0,0.1)" }}>
        <iframe
          title="店鋪位置"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.187281462206!2d120.39881337514896!3d22.773014126148353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e13d72b19742b%3A0x8913f4c010e1e900!2z5ZyL56uL5rCR5aSn5a245bel5YWt5ZCI5Yqf5ZyL6KGX6LuK!5e0!3m2!1szh-TW!2stw!4v1717983641104!5m2!1szh-TW!2stw"
          width="100%"
          height="250"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

export function Form() {
  const [birth, setBirth] = useState('');
  const [mess, setMess] = useState('');
  const [selectedStars, setSelectedStars] = useState(3);
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const totalStars = 5;
  const createArray = length => [...Array(length)];

  const starDescriptions = [
    "非常差",
    "差",
    "普通",
    "好",
    "非常好"
  ];

  const Star = ({ selected = false, onSelect = f => f }) => (
    <FaStar
      color={selected ? "#5CADAD" : "lightgrey"}
      onClick={onSelect}
      style={{ fontSize: "30px", marginRight: "6px", cursor: "pointer", transition: "color 0.3s" }}
      onMouseEnter={onSelect}
    />
  );

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "請輸入您的姓名";
    if (!birth) newErrors.birth = "請選擇生日";
    else if (new Date(birth) > new Date()) newErrors.birth = "生日不能是未來日期";
    if (!mess.trim()) newErrors.mess = "回饋內容不可空白";
    return newErrors;
  };

  const submit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("姓名：" + name);
    console.log("生日：" + birth);
    console.log("評分：" + selectedStars + " 顆星 - " + starDescriptions[selectedStars - 1]);
    console.log("回饋：" + mess);

    setSubmitted(true);
    setErrors({});
  };

  const resetForm = () => {
    setName("");
    setBirth("");
    setMess("");
    setSelectedStars(3);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="feedback-form" style={{ maxWidth: 500, margin: "20px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8, boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#5CADAD" }}>意見回饋</h2>
      <p style={{ textAlign: "center" }}>我們重視您的每一份心聲！</p>

      {submitted ? (
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <h3>感謝您的回饋，{name}！</h3>
          <p>您的評分：{selectedStars} 顆星 - {starDescriptions[selectedStars - 1]}</p>
          <button onClick={resetForm} style={{ padding: "10px 20px", backgroundColor: "#5CADAD", border: "none", color: "white", borderRadius: 5, cursor: "pointer" }}>再次填寫</button>
        </div>
      ) : (
        <>
          <div className="star-rating" style={{ textAlign: "center", marginBottom: 15 }}>
            {createArray(totalStars).map((n, i) => (
              <Star
                key={i}
                selected={selectedStars > i}
                onSelect={() => setSelectedStars(i + 1)}
              />
            ))}
            <p style={{ marginTop: 5, fontWeight: "bold", color: "#5CADAD" }}>{starDescriptions[selectedStars - 1]}</p>
          </div>

          <form onSubmit={submit} noValidate>
            <label style={{ display: "block", marginBottom: 10 }}>
              姓名：
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "8px", marginTop: 5, borderRadius: 4, border: errors.name ? "1.5px solid red" : "1px solid #ccc" }}
              />
              {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}
            </label>

            <label style={{ display: "block", marginBottom: 10 }}>
              生日：
              <input
                value={birth}
                onChange={(e) => setBirth(e.target.value)}
                type="date"
                style={{ width: "100%", padding: "8px", marginTop: 5, borderRadius: 4, border: errors.birth ? "1.5px solid red" : "1px solid #ccc" }}
                max={new Date().toISOString().split("T")[0]}
              />
              {errors.birth && <small style={{ color: "red" }}>{errors.birth}</small>}
            </label>

            <label style={{ display: "block", marginBottom: 15 }}>
              回饋：
              <textarea
                value={mess}
                onChange={(e) => setMess(e.target.value)}
                placeholder="請輸入您的寶貴意見"
                style={{ width: "100%", minHeight: 100, padding: "8px", marginTop: 5, borderRadius: 4, border: errors.mess ? "1.5px solid red" : "1px solid #ccc" }}
              />
              {errors.mess && <small style={{ color: "red" }}>{errors.mess}</small>}
            </label>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                type="submit"
                value="送出"
                style={{ cursor: "pointer", padding: "10px 20px", backgroundColor: "#5CADAD", color: "white", border: "none", borderRadius: 5 }}
              />
              <button
                type="button"
                onClick={resetForm}
                style={{ padding: "10px 20px", borderRadius: 5, border: "1px solid #ccc", cursor: "pointer" }}
              >
                取消
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
