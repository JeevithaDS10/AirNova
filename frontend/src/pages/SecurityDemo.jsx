// src/pages/SecurityDemo.jsx
export default function SecurityDemo() {
  return (
    <div>
      <h2>Security & Cryptography Demo</h2>
      <p>
        On this page we will call backend APIs to show:
      </p>
      <ul>
        <li>Hashed password stored for current user</li>
        <li>Encrypted UPI / card data from payments table</li>
        <li>JWT token issued at login</li>
      </ul>
      <p>
        Right now this is just a placeholder – we will connect it to backend soon.
      </p>
    </div>
  );
}
