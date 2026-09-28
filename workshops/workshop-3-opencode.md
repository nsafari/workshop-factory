# کارگاه ۳: استفاده از OpenCode و oh-my-openagent

**مدت**: ۱ ساعت و ۳۰ دقیقه
**مخاطب**: اعضای فنی موسسه آموزشی
**پیش‌نیاز**: کارگاه ۱ و ۲ یا آشنایی پایه با هوش مصنوعی و Agent

---

## چرا این کارگاه مهم است؟

شاید فکر کنید هوش مصنوعی فقط برای نوشتن ایمیل و خلاصه کردن مقاله مفید است. اما در دنیای برنامه‌نویسی، هوش مصنوعی می‌تواند همکار شما باشد. این کارگاه بر دو لایه استوار است: **لایه A، اصول پایدار**؛ مهارت‌هایی مثل کاوش در کد، تولید تست، ریفکتورینگ، اعتبارسنجی و بازبینی انسانی که مستقل از هر ابزاری کاربرد دارند. و **لایه B، پیاده‌سازی با ابزار**؛ ابزارهای مشخصی مثل OpenCode و oh-my-openagent که این اصول را عملی می‌کنند. اما مهم‌تر از خود ابزارها، یادگیری اصول پایدار است؛ چون ابزارها ممکن است تغییر کنند، ولی اصول می‌مانند. این کارگاه شما را به جایی می‌رساند که خودتان بتوانید از این ابزارها برای بهبود کارتان استفاده کنید، بدون اینکه منتظر کمک دیگران باشید.

نکته کلیدی این است: هوش مصنوعی جایگزین شما نمی‌شود، اما شما را قوی‌تر می‌کند. وقتی بدانید چطور از Agent برای شناسایی کد استفاده کنید، چطور تست‌های خودکار بسازید، چطور خروجی Agent را اعتبارسنجی کنید و چطور مدل‌های مختلف orchestration را انتخاب کنید، سرعت و کیفیت کارتان چند برابر می‌شود. این یعنی زمان کمتری صرف کارهای تکراری کنید و بیشتر روی خلاقیت و حل مسئله تمرکز کنید.

---

## نکات مهم برای شرکت‌کنندگان

### اصطلاحات فنی این کارگاه
در این کارگاه با اصطلاحاتی مثل **Orchestration**، **Ultrawork**، **Categories** و **Team Mode** آشنا می‌شوید. این اصطلاحات به زبان انگلیسی هستند چون بار معنایی دقیقی دارند. مثلاً «Orchestration» فقط هماهنگی نیست، بلکه روشی است که عامل اصلی وظایف را بین کارگران تقسیم می‌کند و نتایج را بررسی می‌کند.

### نفهمیدن اصطلاحات
اگر اصطلاحی مثل «Ultrawork» یا «Categories» را نفهمیدید، **نگران نباشید**. مهم‌تر از فهم تک‌تک کلمات، فهم کلی مطلب است. مثلاً اگر نفهمیدید Categories یعنی چه، فقط بدانید یعنی «دسته‌بندی وظایف بر اساس نوع کار». بقیه مفاهیم را با کمک نمونه‌های عملی یاد بگیرید.

### سؤال از مدرس
اصطلاحاتی مثل **Orchestration**، **Ultrawork** و **Categories** در این کارگاه **پرتکرار** و **مرکزی** هستند. اگر یکی از آنها را نفهمیدید، حتماً سؤال کنید. فهم این مفاهیم به شما کمک می‌کند از ابزارها بهینه استفاده کنید و سرعت کارتان را بالا ببرید.

---

## اهداف یادگیری

بعد از این کارگاه، شما می‌توانید:

**اصول پایدار (لایه A):**
1. اصول کدنویسی مبتنی بر Agent و نحوه کاوش در کد را بفهمید
2. برای پروژه تست بنویسید و خروجی Agent را اعتبارسنجی کنید
3. کد را ریفکتور کنید
4. مفهوم Orchestration و جداسازی برنامه‌ریزی از اجرا را بفهمید
5. اهمیت مجوزهای ابزار و بازبینی انسانی را بدانید

**پیاده‌سازی با ابزار (لایه B):**
6. OpenCode و oh-my-openagent را نصب و راه‌اندازی کنید
7. از Ultrawork برای وظایف پیچیده استفاده کنید
8. Categories و Skills را بشناسید و درست استفاده کنید
9. Team Mode را برای پروژه‌های تیمی درک کنید

---

## ساختار کارگاه

این کارگاه بر پایه دو لایه طراحی شده است:

### لایه A: اصول پایدار
مهارت‌ها و اصولی که مستقل از ابزار خاصی هستند و همیشه کاربرد دارند:
- اصول کدنویسی مبتنی بر Agent
- کاوش در کد
- برنامه‌ریزی
- تولید تست
- ریفکتورینگ
- اعتبارسنجی
- مجوزهای ابزار
- بازبینی انسانی
- Orchestration

### لایه B: پیاده‌سازی با ابزار
ابزارهای مشخصی که این اصول را عملی می‌کنند:
- OpenCode
- oh-my-openagent
- Skills
- Categories
- Team Mode
- Ultrawork

> **نکته مهم درباره وابستگی به ابزار:** ابزارهای لایه B ممکن است در آینده تغییر کنند یا جایگزین شوند، اما اصول لایه A پایدار می‌مانند. تمرکز اصلی این کارگاه بر یادگیری اصول است؛ ابزارها فقط راهی برای تمرین این اصول هستند. پس اگر فردا ابزار جدیدی آمد، با دانستن اصول، به‌راحتی می‌توانید آن را یاد بگیرید.

در ادامه، هر بخش یک اصل از لایه A را با کمک ابزارهای لایه B تمرین می‌کند. برچسب هر بخش نشان می‌دهد تمرکز اصلی آن روی کدام لایه است.

### بخش ۱: معرفی ابزارها (۱۵ دقیقه) - لایه B

#### ۱.۱ OpenCode چیست؟ (۵ دقیقه)
- تعریف: محیط کدنویسی هوشمند
- ویژگی‌ها:
  - تکمیل خودکار کد
  - توضیح کد
  - پیدا کردن خطاها
  - پیشنهاد بهبود

#### ۱.۲ oh-my-openagent چیست؟ (۵ دقیقه)
- تعریف: Agent هوشمند برای کدنویسی
- ویژگی‌ها:
  - شناسایی کد
  - نوشتن تست
  - ریفکتورینگ
  - سیستم Orchestration

#### ۱.۳ چرا این ابزارها مهم هستند؟ (۵ دقیقه)
- افزایش سرعت توسعه
- کاهش خطاها
- بهبود کیفیت کد
- یادگیری سریع‌تر

---

### بخش ۲: نصب و راه‌اندازی (۱۵ دقیقه) - لایه B

#### ۲.۱ نصب OpenCode (۵ دقیقه)
```bash
# نصب با npm
npm install -g opencode

# یا با yarn
yarn global add opencode

# بررسی نصب
opencode --version
```

#### ۲.۲ نصب oh-my-openagent (۵ دقیقه)
```bash
# نصب با pip
pip install oh-my-openagent

# یا با poetry
poetry add oh-my-openagent

# بررسی نصب
oh-agent --version
```

#### ۲.۳ پیکربندی اولیه (۵ دقیقه)
```bash
# ایجاد فایل پیکربندی
opencode init

# تنظیم API key
opencode config set api_key YOUR_API_KEY

# تنظیم مدل پیش‌فرض
opencode config set model gpt-4
```

---

### بخش ۳: شناسایی کد با Agent (۲۰ دقیقه) - لایه A

#### ۳.۱ شناسایی کد موجود (۱۰ دقیقه)
```python
# استفاده از oh-my-openagent برای شناسایی کد
from oh_agent import CodeAnalyzer

# ایجاد تحلیلگر
analyzer = CodeAnalyzer()

# تحلیل یک فایل
result = analyzer.analyze_file("app.py")

# نمایش نتایج
print("توضیح کد:")
print(result.explanation)

print("\nپیشنهادات بهبود:")
for suggestion in result.suggestions:
    print(f"- {suggestion}")

print("\nخطاهای احتمالی:")
for error in result.potential_errors:
    print(f"- {error}")
```

#### ۳.۲ شناسایی الگوها (۵ دقیقه)
```python
# شناسایی الگوهای کدنویسی
patterns = analyzer.find_patterns("src/")

print("الگوهای شناسایی شده:")
for pattern in patterns:
    print(f"- {pattern.name}: {pattern.description}")
    print(f"  تعداد تکرار: {pattern.count}")
    print(f"  پیشنهاد: {pattern.suggestion}")
```

#### ۳.۳ تولید گزارش (۵ دقیقه)
```python
# تولید گزارش جامع
report = analyzer.generate_report("src/")

# ذخیره گزارش
with open("code_report.md", "w") as f:
    f.write(report)

print("گزارش در فایل code_report.md ذخیره شد")
```

---

### بخش ۴: نوشتن تست (۲۰ دقیقه) - لایه A

#### ۴.۱ نوشتن تست خودکار (۱۰ دقیقه)
```python
# استفاده از oh-my-openagent برای نوشتن تست
from oh_agent import TestGenerator

# ایجاد تولیدکننده تست
generator = TestGenerator()

# تولید تست برای یک تابع
def calculate_price(quantity, unit_price):
    return quantity * unit_price

# تولید تست
tests = generator.generate_tests(calculate_price)

print("تست‌های تولید شده:")
for test in tests:
    print(f"\n{test.name}:")
    print(test.code)
```

#### ۴.۲ نوشتن تست برای کلاس (۵ دقیقه)
```python
# تولید تست برای کلاس
class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def add_item(self, item, price):
        self.items.append({"item": item, "price": price})
    
    def remove_item(self, item):
        self.items = [i for i in self.items if i["item"] != item]
    
    def get_total(self):
        return sum(i["price"] for i in self.items)

# تولید تست برای کلاس
tests = generator.generate_class_tests(ShoppingCart)

print("تست‌های کلاس:")
for test in tests:
    print(f"\n{test.name}:")
    print(test.code)
```

#### ۴.۳ اجرای تست‌ها (۵ دقیقه)
```python
# اجرای تست‌ها
import subprocess

# اجرای pytest
result = subprocess.run(["pytest", "tests/", "-v"], capture_output=True, text=True)

print("نتایج اجرا:")
print(result.stdout)

if result.returncode != 0:
    print("خطاها:")
    print(result.stderr)
```

#### ۴.۴ ایجاد تست برای یک پروژه واقعی (۵ دقیقه)
```python
# سناریو: ایجاد تست برای پروژه فروشگاه آنلاین
from oh_agent import ProjectTestGenerator

# ایجاد تولیدکننده تست پروژه
project_generator = ProjectTestGenerator()

# تحلیل ساختار پروژه
project_structure = project_generator.analyze_project("online_store/")

print("ساختار پروژه شناسایی شده:")
for module in project_structure.modules:
    print(f"- {module.name}: {module.description}")

# تولید تست‌های یکپارچه
integration_tests = project_generator.generate_integration_tests("online_store/")

print("\nتست‌های یکپارچه تولید شده:")
for test in integration_tests:
    print(f"\n{test.name}:")
    print(f"توضیح: {test.description}")
    print(f"کد:\n{test.code}")

# تولید تست‌های عملکردی
performance_tests = project_generator.generate_performance_tests("online_store/")

print("\nتست‌های عملکردی:")
for test in performance_tests:
    print(f"\n{test.name}:")
    print(f"آستانه: {test.threshold}")
    print(f"کد:\n{test.code}")
```

**خروجی نمونه:**
```
ساختار پروژه شناسایی شده:
- auth: احراز هویت کاربران
- products: مدیریت محصولات
- orders: پردازش سفارشات
- payments: پرداخت آنلاین

تست‌های یکپارچه تولید شده:

test_user_registration_flow:
توضیح: تست کامل فرآیند ثبت‌نام کاربر
کد:
def test_user_registration_flow(client):
    # ۱. ثبت‌نام
    response = client.post("/register", json={
        "email": "test@example.com",
        "password": "secure123"
    })
    assert response.status_code == 201
    
    # ۲. ورود
    response = client.post("/login", json={
        "email": "test@example.com",
        "password": "secure123"
    })
    assert response.status_code == 200
    assert "token" in response.json
    
    # ۳. دسترسی به پروفایل
    token = response.json["token"]
    response = client.get("/profile", headers={
        "Authorization": f"Bearer {token}"
    })
    assert response.status_code == 200
```

---

### بخش ۵: اعتبارسنجی خروجی Agent (۱۰ دقیقه) - لایه A

Agent ممکن است اشتباه کند. پس هر خروجی که تولید می‌کند باید قبل از استفاده بررسی شود. این بخش به شما یاد می‌دهد چطور خروجی Agent را اعتبارسنجی کنید.

#### ۵.۱ بررسی تست تولیدشده (۲ دقیقه)
- آیا تست واقعاً همان چیزی را بررسی می‌کند که قرار است بررسی کند؟
- آیا تست فقط «می‌گذرد» یا واقعاً رفتار درست را می‌سنجد؟
- یک تست خوب باید هم حالت درست و هم حالت خطا را پوشش دهد.

#### ۵.۲ اجرای تست (۲ دقیقه)
- تست‌ها را واقعاً اجرا کنید و مطمئن شوید اجرا می‌شوند
- یک تست که اجرا نمی‌شود، هیچ ارزشی ندارد

```bash
# اجرای تست‌ها
pytest tests/ -v
```

#### ۵.۳ بررسی false positive و false negative (۳ دقیقه)
- **false positive**: تستی که می‌گذرد ولی در واقع چیزی را بررسی نمی‌کند. مثلاً تستی که همیشه موفق است، حتی وقتی کد خراب است.
- **false negative**: تستی که خطای واقعی را نمی‌گیرد. مثلاً تستی که باید شکست بخورد ولی می‌گذرد و خطا را پنهان می‌کند.
- در هر دو حالت، تست به شما اطلاعات غلط می‌دهد و باید اصلاح شود.

#### ۵.۴ بررسی تغییرات کد (۲ دقیقه)
- تغییراتی که Agent اعمال کرده را خط‌به‌خط بررسی کنید
- آیا تغییرات فقط همان چیزی است که خواسته بودید؟
- آیا تغییر غیرمنتظره‌ای در جای دیگری از کد رخ داده است؟

#### ۵.۵ بازبینی انسانی کد (۱ دقیقه)
- در نهایت، یک انسان باید خروجی را تأیید کند
- هوش مصنوعی ابزار است، نه جایگزین قضاوت انسانی
- هیچ تغییری بدون تأیید انسانی نباید وارد پروژه شود

---

### بخش ۶: ریفکتورینگ کد (۱۵ دقیقه) - لایه A

#### ۶.۱ ریفکتورینگ خودکار (۱۰ دقیقه)
```python
# استفاده از oh-my-openagent برای ریفکتورینگ
from oh_agent import Refactorer

# ایجاد ریفکتورر
refactorer = Refactorer()

# کد اصلی
original_code = """
def process_data(data):
    result = []
    for item in data:
        if item > 0:
            result.append(item * 2)
        else:
            result.append(0)
    return result
"""

# ریفکتورینگ
refactored = refactorer.refactor(original_code)

print("کد اصلی:")
print(original_code)

print("\nکد ریفکتور شده:")
print(refactored.code)

print("\nتوضیحات تغییرات:")
for change in refactored.changes:
    print(f"- {change}")
```

#### ۶.۲ بهینه‌سازی کد (۵ دقیقه)
```python
# بهینه‌سازی کد
optimized = refactorer.optimize(original_code)

print("کد بهینه شده:")
print(optimized.code)

print("\nبهبودها:")
for improvement in optimized.improvements:
    print(f"- {improvement}")
```

---

### بخش ۷: سیستم Orchestration (۱۵ دقیقه) - لایه A

#### ۷.۱ مفهوم Orchestration چیست؟ (۵ دقیقه)
- جداسازی برنامه‌ریزی از اجرا
- عامل اصلی (Main Agent) فکر می‌کند و هماهنگ می‌کند
- وظایف از طریق ابزار `task` واگذار می‌شوند
- عامل اصلی هرگز جلسه را به عامل دیگری نمی‌دهد

#### ۷.۲ کی و چطور استفاده کنیم؟ (۵ دقیقه)

| وضعیت | رویکرد | چه اتفاقی می‌افتد |
|-------|--------|-------------------|
| تعمیر سریع، یک فایل | فقط پرامپت | عامل اصلی خودش انجام می‌دهد |
| پیچیده، توضیح زمینه سخت است | تایپ `ulw` | عامل اصلی حالت ultrawork را فعال می‌کند |
| پیچیده، نیاز به نقشه نوشتاری | `/ulw-plan` سپس `/ulw-execute` | Ultrawork Planner مصاحبه می‌کند و نقشه می‌نویسد |
| وظایف زیاد با وابستگی | `mass-ulw` | عامل اصلی نمودار وابستگی تعریف می‌کند |
| چند مسیر همزمان که نیاز به تبادل دارند | Team Mode | عامل اصلی رهبر فرزندان پس‌زمینه می‌شود |

#### ۷.۳ Categories و Skills (۵ دقیقه)
- **Categories**: دسته‌بندی وظایف بر اساس نوع کار
  - `quick`: کارهای مکانیکی، تک فایل
  - `deep`: عیب‌یابی پیچیده، تحقیق سنگین
  - `ultrabrain`: یک مسئله منطقی واقعاً سخت
  - `visual-engineering`: فرانت‌اند، UI/UX
  - `writing`: مستندات و متن
- **Skills**: مهارت‌های اضافی که به کارگر داده می‌شود

---

### بخش ۸: Ultrawork در عمل (۱۰ دقیقه) - لایه B

#### ۸.۱ Ultrawork چیست؟ (۵ دقیقه)
- حالتی که عامل اصلی کاوش می‌کند، برنامه‌ریزی می‌کند، واگذار می‌کند و با شواهد تأیید می‌کند
- مناسب وظایف پیچیده که توضیح زمینه آنها سخت است

#### ۸.۲ مراحل Ultrawork (۵ دقیقه)
1. **کاوش**: تحقیق خواندنی موازی
2. **برنامه‌ریزی**: نوشتن نقشه در `.omo/plans/`
3. **واگذاری**: ارسال وظایف به کارگران
4. **تأیید**: بررسی نتایج با شواهد

---

### بخش ۹: جمع‌بندی و سؤالات (۵ دقیقه) - هر دو لایه

#### ۹.۱ خلاصه مفاهیم کلیدی (۳ دقیقه)

**لایه A: اصول پایدار**
- کاوش در کد، تولید تست و اعتبارسنجی خروجی Agent
- ریفکتورینگ و بهبود کد
- Orchestration: جداسازی برنامه‌ریزی از اجرا
- بازبینی انسانی: هوش مصنوعی ابزار است، نه جایگزین

**لایه B: پیاده‌سازی با ابزار**
- OpenCode محیط کدنویسی هوشمند
- oh-my-openagent Agent برای کدنویسی
- Ultrawork برای وظایف پیچیده
- Categories و Skills برای بهینه‌سازی

**نکته پایانی:** ابزارها ممکن است تغییر کنند، اما اصول پایدار می‌مانند. چیزی که امروز یاد می‌گیرید، فردا هم به کارتان می‌آید.

#### ۹.۲ سؤال و پاسخ (۲ دقیقه)

---

## مواد مورد نیاز

### برای مدرس
- لپ‌تاپ با Python و Node.js نصب شده
- دسترسی به API (OpenAI یا Anthropic)
- پروژه نمونه برای نمایش

### برای شرکت‌کنندگان
- لپ‌تاپ با Python و Node.js
- دسترسی به اینترنت
- ویرایشگر کد (VS Code پیشنهاد می‌شود)

### نصب ابزارها
```bash
# نصب OpenCode
npm install -g opencode

# نصب oh-my-openagent
pip install oh-my-openagent

# نصب پیش‌نیازها
pip install pytest black flake8
```

---

## نکات آموزشی

### نمایش زنده
- نصب و راه‌اندازی ابزارها
- شناسایی کد در زمان واقعی
- نوشتن تست خودکار
- ریفکتورینگ کد

### تمرین عملی
- شرکت‌کنندگان روی پروژه خودشان کار کنند
- در گروه‌های کوچک حل مسئله
- اشتراک‌گذاری نتایج

### اشتباهات رایج
- استفاده نادرست از مدل‌های orchestration
- عدم بررسی خروجی Agent
- اعتماد کورکورانه به پیشنهادات

---

## ارزیابی یادگیری

### سؤالات سریع
1. تفاوت OpenCode با oh-my-openagent چیست؟
2. Orchestration چیست و چرا مهم است؟
3. چه زمانی از Ultrawork استفاده کنیم؟
4. Categories چه کمکی می‌کنند؟
5. تفاوت لایه A (اصول پایدار) و لایه B (ابزارها) چیست؟
6. چرا باید خروجی Agent را اعتبارسنجی کنیم؟

### تکلیف عملی
- یک پروژه ساده را با ابزارها تحلیل کنید
- تست‌های خودکار تولید کنید
- خروجی Agent را اعتبارسنجی کنید
- کد را ریفکتور کنید
- یک وظیفه پیچیده را با Ultrawork انجام دهید

---

## منابع تکمیلی

### مستندات
- OpenCode Documentation
- oh-my-openagent Documentation
- pytest Documentation

### آموزش‌ها
- OpenCode Tutorial
- oh-my-openagent Orchestration Guide
- Python Testing with pytest

### ابزارها
- VS Code with OpenCode Extension
- GitHub Copilot
- Black (Code Formatter)
- Flake8 (Linter)