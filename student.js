/* student.js — ใช้ร่วมในทุกหน้าโหมด
 * 1) นับวิว (ความนิยม) แบบสาธารณะ
 * 2) กั้นการเข้าเล่น: ต้องเป็นนักเรียนที่ลงทะเบียนและล็อกอินแล้วเท่านั้น
 * 3) เติมชื่อนักเรียนที่ล็อกอินลงช่องชื่อให้อัตโนมัติ (ล็อกไม่ให้แก้)
 * ต้องวางหลัง config.js และตั้ง window.PRACTICE_MODE ไว้ก่อน
 */
(function () {
  var KEY = 'mathStudent';

  function getStudent() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }
  window.MATH_STUDENT = getStudent();
  window.getMathStudent = getStudent;

  function apiUrl() {
    return (typeof API_URL !== 'undefined' && API_URL && API_URL.indexOf('วาง') === -1) ? API_URL : '';
  }

  // นับวิวสาธารณะ (ไม่บล็อกการทำงาน ผิดพลาดก็ปล่อย)
  function bumpView() {
    var url = apiUrl();
    if (!url || !window.PRACTICE_MODE) return;
    try {
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'bumpView', mode: window.PRACTICE_MODE })
      }).catch(function () {});
    } catch (e) {}
  }

  // ม่านกั้นเมื่อยังไม่ล็อกอิน
  function showGate() {
    var ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(5,8,20,.93);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:24px;font-family:Kanit,sans-serif;color:#eaeefb';
    ov.innerHTML =
      '<div style="max-width:340px;text-align:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:28px 24px">'
      + '<div style="width:48px;height:48px;border-radius:14px;margin:0 auto 12px;background:rgba(65,211,240,.16);color:#41d3f0;display:flex;align-items:center;justify-content:center">'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg></div>'
      + '<div style="font-size:19px;font-weight:700;margin-bottom:8px">ต้องเข้าสู่ระบบก่อนเล่น</div>'
      + '<p style="color:#8b93b8;font-size:14px;margin:0 0 18px;line-height:1.5">โหมดนี้สงวนสำหรับนักเรียนที่ลงทะเบียน<br>กรุณาเข้าสู่ระบบด้วยรหัสผ่านของนักเรียนที่หน้าแรก</p>'
      + '<a href="index.html" style="display:inline-block;background:linear-gradient(120deg,#41d3f0,#7ce0f2);color:#04222b;font-weight:600;text-decoration:none;border-radius:12px;padding:11px 24px">ไปหน้าเข้าสู่ระบบ</a>'
      + '</div>';
    document.body.appendChild(ov);
  }

  function lockNameField(s) {
    var inp = document.getElementById('nameInput') || document.getElementById('rName');
    if (inp) {
      inp.value = s.name || s.fullName || '';
      inp.setAttribute('readonly', 'readonly');
      inp.style.opacity = '.85';
      inp.style.cursor = 'default';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    bumpView();
    var s = getStudent();
    if (!s) { showGate(); return; }
    lockNameField(s);
  });
})();
