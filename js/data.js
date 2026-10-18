/*
 * תוכן הלימוד – מבוסס על תוכנית הלימודים במדעי המחשב (5 יח"ל, מסלול Java):
 * יסודות מדעי המחשב 1+2, עיצוב תוכנה (מחלקות ועצמים) ומבני נתונים.
 *
 * סוגי שאלות:
 *   mc     – בחירה מרובה. answer = אינדקס התשובה הנכונה.
 *   output – "מה יודפס?". answer = הפלט המדויק (שורות מופרדות ב-\n).
 *   fill   – השלמת קוד במקום ____. answer = מערך תשובות מקובלות.
 */
window.UNITS = [
  {
    id: "basics",
    icon: "🌱",
    title: "יסודות מדעי המחשב",
    desc: "משתנים, תנאים, לולאות, פעולות, מחרוזות ומערכים",
    lessons: [
      {
        id: "vars",
        title: "משתנים וטיפוסים",
        intro: "משתנה הוא תא בזיכרון עם שם וטיפוס. בשיעור הזה נכיר את הטיפוסים הבסיסיים ואת פעולות החשבון.",
        sections: [
          {
            h: "טיפוסים בסיסיים",
            html: `<p>ב-Java חייבים להצהיר על טיפוס המשתנה לפני שמשתמשים בו:</p>
<ul>
<li><code>int</code> – מספר שלם (5, -12, 0)</li>
<li><code>double</code> – מספר ממשי (3.14, 2.0)</li>
<li><code>char</code> – תו בודד, בגרש בודד: <code>'A'</code></li>
<li><code>boolean</code> – <code>true</code> או <code>false</code></li>
<li><code>String</code> – מחרוזת (טקסט), במרכאות: <code>"שלום"</code></li>
</ul>`,
            code: `int age = 16;
double avg = 92.5;
char grade = 'A';
boolean passed = true;
String name = "Dana";`
          },
          {
            h: "חלוקה בשלמים ושארית",
            html: `<p>כששני האופרנדים שלמים, <code>/</code> מבצע <b>חלוקה בשלמים</b> (החלק אחרי הנקודה נזרק). האופרטור <code>%</code> מחזיר את <b>השארית</b>.</p>
<div class="callout">טריק חשוב לבגרות: <code>n % 10</code> = ספרת האחדות, <code>n / 10</code> = המספר בלי ספרת האחדות.</div>`,
            code: `System.out.println(7 / 2);     // 3
System.out.println(7 % 2);     // 1
System.out.println(7.0 / 2);   // 3.5
System.out.println((double) 7 / 2); // 3.5  (המרת טיפוס - casting)
int n = 357;
System.out.println(n % 10);    // 7
System.out.println(n / 10);    // 35`
          },
          {
            h: "אופרטורים מקוצרים ושרשור מחרוזות",
            html: `<p><code>x += 3</code> זהה ל-<code>x = x + 3</code>. <code>x++</code> מגדיל ב-1. חיבור עם מחרוזת הופך לשרשור – והחישוב מתבצע <b>משמאל לימין</b>.</p>`,
            code: `int x = 5;
x += 3;   // 8
x++;      // 9
System.out.println("x=" + 1 + 2);  // x=12
System.out.println(1 + 2 + "x");   // 3x`
          }
        ],
        questions: [
          { type: "mc", q: "מה ערכו של x?", code: `int x = 7 / 2;`, options: ["3.5", "3", "4", "שגיאת קומפילציה"], answer: 1, explain: "שני האופרנדים שלמים, ולכן מתבצעת חלוקה בשלמים: 7/2 = 3." },
          { type: "output", q: "מה יודפס?", code: `System.out.println(17 % 5);`, answer: "2", explain: "17 = 5·3 + 2, השארית היא 2." },
          { type: "mc", q: "מה יודפס?", code: `double d = 7 / 2;
System.out.println(d);`, options: ["3.5", "3", "3.0", "4.0"], answer: 2, explain: "קודם מחושב 7/2 בשלמים = 3, ורק אז הוא נשמר ב-double ולכן 3.0." },
          { type: "output", q: "מה יודפס?", code: `int a = 5;
a += 3;
a *= 2;
System.out.println(a);`, answer: "16", explain: "a=5 → 8 → 16." },
          { type: "output", q: "מה יודפס?", code: `System.out.println("x=" + 2 + 3);`, answer: "x=23", explain: "\"x=\" + 2 נותן \"x=2\" (מחרוזת), ואז + 3 משרשר: \"x=23\"." },
          { type: "output", q: "מה יודפס?", code: `System.out.println(2 + 3 + "x");`, answer: "5x", explain: "החישוב משמאל לימין: 2+3=5 (מספרים), ואז 5+\"x\" = \"5x\"." },
          { type: "mc", q: "איזו הצהרה תקינה?", options: ["char c = \"A\";", "char c = 'A';", "char c = 'AB';", "Char c = 'A';"], ltr: true, answer: 1, explain: "תו בודד נכתב בגרשיים בודדים, והטיפוס הוא char באות קטנה." },
          { type: "fill", q: "השלם כך שיודפס 3.5:", code: `int a = 7, b = 2;
System.out.println((____) a / b);`, answer: ["double"], explain: "המרה (casting) של a ל-double גורמת לחלוקה ממשית." }
        ]
      },
      {
        id: "io",
        title: "קלט ופלט",
        intro: "קליטת נתונים מהמשתמש בעזרת Scanner והדפסה למסך.",
        sections: [
          {
            h: "הדפסה",
            html: `<p><code>System.out.println</code> מדפיס ויורד שורה. <code>System.out.print</code> מדפיס <b>בלי</b> לרדת שורה.</p>`,
            code: `System.out.print("Hello ");
System.out.println("World");
System.out.println("Next line");`
          },
          {
            h: "קלט עם Scanner",
            html: `<p>כדי לקלוט מהמשתמש מייבאים את <code>Scanner</code> ויוצרים עצם שקורא מ-<code>System.in</code>.</p>
<ul><li><code>nextInt()</code> – שלם</li><li><code>nextDouble()</code> – ממשי</li><li><code>next()</code> – מילה אחת</li><li><code>nextLine()</code> – שורה שלמה</li><li><code>next().charAt(0)</code> – תו</li></ul>`,
            code: `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.print("Enter your age: ");
        int age = in.nextInt();
        System.out.println("Next year you will be " + (age + 1));
    }
}`
          }
        ],
        questions: [
          { type: "mc", q: "איזו פקודה קולטת מספר שלם?", options: ["in.nextInt()", "in.readInt()", "in.next()", "Scanner.int()"], ltr: true, answer: 0, explain: "nextInt קולטת את המספר השלם הבא בקלט." },
          { type: "output", q: "מה יודפס?", code: `System.out.print("A");
System.out.println("B");
System.out.print("C");`, answer: "AB\nC", explain: "print לא יורד שורה, println כן. לכן AB בשורה הראשונה ו-C בשנייה." },
          { type: "fill", q: "השלם כדי לקלוט מספר ממשי:", code: `double num = in.____();`, answer: ["nextDouble"], explain: "nextDouble קולטת מספר ממשי." },
          { type: "mc", q: "איזו שורה נדרשת בראש הקובץ כדי להשתמש ב-Scanner?", options: ["import java.util.Scanner;", "import Scanner;", "using java.Scanner;", "include <Scanner>"], ltr: true, answer: 0, explain: "Scanner נמצא בחבילה java.util." },
          { type: "output", q: "נניח שהמשתמש הקליד 4. מה יודפס?", code: `int n = in.nextInt();
System.out.println(n * n + 1);`, answer: "17", explain: "4·4 + 1 = 17 (כפל לפני חיבור)." }
        ]
      },
      {
        id: "if",
        title: "משפטי תנאי",
        intro: "if / else, תנאים מורכבים עם && ו-|| ומשפט switch.",
        sections: [
          {
            h: "if – else",
            html: `<p>אופרטורי השוואה: <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.<br>אופרטורים לוגיים: <code>&amp;&amp;</code> (וגם), <code>||</code> (או), <code>!</code> (לא).</p>`,
            code: `int grade = 85;
if (grade >= 90) {
    System.out.println("Excellent");
} else if (grade >= 55) {
    System.out.println("Passed");
} else {
    System.out.println("Failed");
}`
          },
          {
            h: "switch",
            html: `<p>switch בודק ערך מול רשימת מקרים. <b>שימו לב:</b> בלי <code>break</code> הביצוע "נופל" למקרה הבא!</p>`,
            code: `int day = 2;
switch (day) {
    case 1: System.out.println("Sunday"); break;
    case 2: System.out.println("Monday"); break;
    default: System.out.println("Other");
}`
          },
          {
            h: "חוקי דה-מורגן",
            html: `<div class="callout"><code>!(a &amp;&amp; b)</code> שקול ל-<code>!a || !b</code><br><code>!(a || b)</code> שקול ל-<code>!a &amp;&amp; !b</code></div>`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `int a = 3, b = 7;
if (a > b || b % 2 == 1)
    System.out.println("yes");
else
    System.out.println("no");`, answer: "yes", explain: "a>b שקרי, אבל b%2==1 אמת, ו-|| מספיק שאחד יהיה אמת." },
          { type: "output", q: "מה יודפס?", code: `int n = 2;
switch (n) {
    case 1: System.out.print("A");
    case 2: System.out.print("B");
    case 3: System.out.print("C"); break;
    default: System.out.print("D");
}`, answer: "BC", explain: "נכנסים ב-case 2, ובגלל שאין break ממשיכים ל-case 3 עד ה-break." },
          { type: "mc", q: "איזה ביטוי שקול ל-<code>!(x > 3 && x < 8)</code>?", options: ["x <= 3 || x >= 8", "x <= 3 && x >= 8", "x < 3 || x > 8", "x > 3 || x < 8"], ltr: true, answer: 0, explain: "לפי דה-מורגן: !(A && B) = !A || !B, ו-!(x>3) הוא x<=3." },
          { type: "output", q: "מה יודפס?", code: `int x = 15;
if (x % 3 == 0 && x % 5 == 0)
    System.out.println("FizzBuzz");
else if (x % 3 == 0)
    System.out.println("Fizz");
else
    System.out.println(x);`, answer: "FizzBuzz", explain: "15 מתחלק גם ב-3 וגם ב-5." },
          { type: "fill", q: "השלם תנאי שבודק אם n זוגי:", code: `if (n ____ 2 == 0)
    System.out.println("even");`, answer: ["%"], explain: "מספר זוגי אם השארית בחלוקה ב-2 היא 0." },
          { type: "mc", q: "מה הבעיה בקוד?", code: `int x = 5;
if (x = 5)
    System.out.println("five");`, options: ["אין בעיה", "צריך == ולא = – שגיאת קומפילציה", "חסר else", "צריך לכתוב equals"], answer: 1, explain: "= הוא השמה ולא השוואה. ב-Java תנאי חייב להיות boolean ולכן זו שגיאת קומפילציה." }
        ]
      },
      {
        id: "loops",
        title: "לולאות",
        intro: "for, while ו-do-while. מונה, צובר ומציאת מקסימום.",
        sections: [
          {
            h: "לולאת for",
            html: `<p>משמשת כשידוע מראש מספר החזרות.</p>`,
            code: `for (int i = 1; i <= 5; i++) {
    System.out.print(i + " ");
}
// 1 2 3 4 5`
          },
          {
            h: "לולאת while",
            html: `<p>משמשת כשלא ידוע מראש מספר החזרות – רצה כל עוד התנאי מתקיים. דוגמה קלאסית: מעבר על ספרות של מספר.</p>`,
            code: `int n = 1234, sum = 0;
while (n > 0) {
    sum += n % 10;   // ספרת האחדות
    n /= 10;         // מורידים את ספרת האחדות
}
System.out.println(sum); // 10`
          },
          {
            h: "do-while",
            html: `<p>הגוף מתבצע <b>לפחות פעם אחת</b> והתנאי נבדק בסוף. שימושי לקליטה עם בדיקת תקינות.</p>`,
            code: `int num;
do {
    System.out.print("Enter a positive number: ");
    num = in.nextInt();
} while (num <= 0);`
          },
          {
            h: "תבניות: מונה, צובר, מקסימום",
            html: `<div class="callout">מונה וצובר מאתחלים ל-0 <b>לפני</b> הלולאה. מקסימום מאתחלים לאיבר הראשון.</div>`,
            code: `int count = 0, sum = 0, max = in.nextInt();
sum = max; count = 1;
for (int i = 2; i <= 10; i++) {
    int x = in.nextInt();
    sum += x;
    count++;
    if (x > max) max = x;
}
System.out.println("avg = " + (double) sum / count);`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס? (רווחים בסוף לא משנים)", code: `for (int i = 1; i <= 7; i += 2)
    System.out.print(i + " ");`, answer: "1 3 5 7", explain: "i מקבל 1,3,5,7 ואז 9 שכבר לא מקיים את התנאי." },
          { type: "output", q: "מה יודפס?", code: `int sum = 0;
for (int i = 1; i <= 4; i++)
    sum += i;
System.out.println(sum);`, answer: "10", explain: "1+2+3+4 = 10." },
          { type: "mc", q: "כמה פעמים יתבצע גוף הלולאה?", code: `int i = 0;
while (i < 10)
    i += 3;`, options: ["3", "4", "10", "אינסוף"], answer: 1, explain: "i עובר 0→3→6→9→12. הגוף מתבצע 4 פעמים (כשi=0,3,6,9)." },
          { type: "output", q: "מה יודפס?", code: `int n = 5027, count = 0;
while (n > 0) {
    if (n % 10 == 0) count++;
    n /= 10;
}
System.out.println(count);`, answer: "1", explain: "הלולאה סופרת ספרות 0 במספר. ב-5027 יש ספרת 0 אחת." },
          { type: "mc", q: "מה ההבדל המרכזי בין do-while ל-while?", options: ["do-while מהירה יותר", "בdo-while הגוף מתבצע לפחות פעם אחת", "while לא יכולה להשתמש במונה", "אין הבדל"], answer: 1, explain: "ב-do-while התנאי נבדק אחרי ביצוע הגוף." },
          { type: "output", q: "מה יודפס?", code: `int x = 1;
while (x < 100)
    x *= 3;
System.out.println(x);`, answer: "243", explain: "1→3→9→27→81→243. 243 כבר לא קטן מ-100." },
          { type: "fill", q: "השלם לולאה שמדפיסה את המספרים מ-10 עד 1 (בסדר יורד):", code: `for (int i = 10; i >= 1; ____)
    System.out.println(i);`, answer: ["i--", "i-=1", "i=i-1", "--i"], explain: "צריך להקטין את i בכל סיבוב." }
        ]
      },
      {
        id: "nested",
        title: "לולאות מקוננות",
        intro: "לולאה בתוך לולאה – לטבלאות, צורות ובדיקת זוגות.",
        sections: [
          {
            h: "איך זה עובד?",
            html: `<p>על כל סיבוב של הלולאה החיצונית, הלולאה הפנימית רצה <b>מההתחלה ועד הסוף</b>. אם החיצונית רצה n פעמים והפנימית m פעמים – הגוף הפנימי מתבצע n·m פעמים.</p>`,
            code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 4; j++) {
        System.out.print(i * j + "\\t");
    }
    System.out.println();
}`
          },
          {
            h: "משולש כוכביות",
            html: `<p>כשגבול הלולאה הפנימית תלוי במשתנה החיצוני מקבלים צורות:</p>`,
            code: `for (int i = 1; i <= 4; i++) {
    for (int j = 1; j <= i; j++)
        System.out.print("*");
    System.out.println();
}
// *
// **
// ***
// ****`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= i; j++)
        System.out.print("*");
    System.out.println();
}`, answer: "*\n**\n***", explain: "בשורה i מודפסות i כוכביות." },
          { type: "mc", q: "כמה פעמים תודפס המילה Hi?", code: `for (int i = 0; i < 4; i++)
    for (int j = 0; j < 3; j++)
        System.out.println("Hi");`, options: ["7", "12", "16", "9"], answer: 1, explain: "4 · 3 = 12." },
          { type: "output", q: "מה יודפס?", code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        if (i == j) System.out.print(1);
        else System.out.print(0);
    }
    System.out.println();
}`, answer: "100\n010\n001", explain: "מטריצת יחידה – 1 רק כש-i==j (האלכסון)." },
          { type: "mc", q: "כמה פעמים יתבצע ה-print?", code: `for (int i = 1; i <= 4; i++)
    for (int j = i; j <= 4; j++)
        System.out.print("#");`, options: ["16", "10", "8", "4"], answer: 1, explain: "4+3+2+1 = 10." },
          { type: "output", q: "מה יודפס?", code: `int count = 0;
for (int i = 1; i <= 3; i++)
    for (int j = 1; j <= 3; j++)
        if (i + j == 4) count++;
System.out.println(count);`, answer: "3", explain: "הזוגות (1,3), (2,2), (3,1)." }
        ]
      },
      {
        id: "methods",
        title: "פעולות (Methods)",
        intro: "חלוקת התוכנית לפעולות: פרמטרים, ערך מוחזר ו-void.",
        sections: [
          {
            h: "מבנה של פעולה",
            html: `<p><code>public static</code> טיפוס_מוחזר שם(פרמטרים). פעולה שלא מחזירה ערך מוגדרת <code>void</code>.</p>`,
            code: `public static int max(int a, int b) {
    if (a > b) return a;
    return b;
}

public static void printLine(int n) {
    for (int i = 0; i < n; i++)
        System.out.print("-");
    System.out.println();
}

public static void main(String[] args) {
    System.out.println(max(4, 9)); // 9
    printLine(5);                  // -----
}`
          },
          {
            h: "העברה לפי ערך",
            html: `<div class="callout">ב-Java פרמטרים מטיפוס פרימיטיבי (int, double, char, boolean) מועברים <b>לפי ערך</b> – הפעולה מקבלת עותק, ושינוי שלו לא משפיע על המשתנה המקורי.</div>`,
            code: `public static void change(int x) {
    x = 100;
}
// ...
int a = 5;
change(a);
System.out.println(a); // 5`
          },
          {
            h: "פעולה בוליאנית",
            html: `<p>פעולות שמחזירות <code>boolean</code> נפוצות מאוד בבגרות – למשל בדיקה אם מספר ראשוני:</p>`,
            code: `public static boolean isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `public static int sq(int x) {
    return x * x;
}
// ב-main:
System.out.println(sq(3) + sq(4));`, answer: "25", explain: "9 + 16 = 25." },
          { type: "output", q: "מה יודפס?", code: `public static void change(int x) {
    x = x * 10;
}
// ב-main:
int a = 5;
change(a);
System.out.println(a);`, answer: "5", explain: "a מועבר לפי ערך – הפעולה משנה רק את העותק שלה." },
          { type: "fill", q: "השלם את טיפוס הערך המוחזר:", code: `public static ____ isEven(int n) {
    return n % 2 == 0;
}`, answer: ["boolean"], explain: "הביטוי n%2==0 הוא אמת/שקר." },
          { type: "mc", q: "מה המשמעות של void?", options: ["הפעולה לא מקבלת פרמטרים", "הפעולה לא מחזירה ערך", "הפעולה פרטית", "הפעולה ריקה"], answer: 1, explain: "void = הפעולה לא מחזירה ערך." },
          { type: "output", q: "מה יודפס?", code: `public static int f(int a, int b) {
    while (b > 0) {
        a++;
        b--;
    }
    return a;
}
// ב-main:
System.out.println(f(3, 4));`, answer: "7", explain: "a גדל ב-1 בכל פעם ש-b קטן. בסה\"כ 3+4 = 7." },
          { type: "mc", q: "איזו כותרת מתאימה לפעולה שמקבלת מערך שלמים ומחזירה את הממוצע?", options: ["public static int avg(int[] arr)", "public static double avg(int[] arr)", "public static void avg(int arr)", "public double avg(int[] arr[])"], ltr: true, answer: 1, explain: "ממוצע הוא ממשי, ולכן double. הפרמטר הוא מערך int[]." }
        ]
      },
      {
        id: "strings",
        title: "מחרוזות ותווים",
        intro: "הפעולות החשובות של String ועבודה עם char.",
        sections: [
          {
            h: "פעולות של String",
            html: `<table class="api-table"><tr><th>פעולה</th><th>תיאור</th></tr>
<tr><td>s.length()</td><td>אורך המחרוזת</td></tr>
<tr><td>s.charAt(i)</td><td>התו במקום i (מתחילים מ-0)</td></tr>
<tr><td>s.substring(a, b)</td><td>תת-מחרוזת מ-a עד b (לא כולל b)</td></tr>
<tr><td>s.substring(a)</td><td>מ-a עד הסוף</td></tr>
<tr><td>s.indexOf(c)</td><td>המקום הראשון של c, או -1</td></tr>
<tr><td>s.equals(t)</td><td>השוואת תוכן</td></tr>
<tr><td>s.compareTo(t)</td><td>השוואה מילונית: שלילי / 0 / חיובי</td></tr>
<tr><td>s.toUpperCase()</td><td>המרה לאותיות גדולות</td></tr></table>`,
            code: `String s = "computer";
System.out.println(s.length());        // 8
System.out.println(s.charAt(0));       // c
System.out.println(s.substring(3, 6)); // put
System.out.println(s.indexOf('t'));    // 5`
          },
          {
            h: "השוואת מחרוזות",
            html: `<div class="callout">משווים תוכן של מחרוזות עם <code>equals</code> – <b>לא</b> עם <code>==</code>! (<code>==</code> בודק אם זה אותו עצם בזיכרון).</div>`
          },
          {
            h: "תווים הם מספרים",
            html: `<p>כל <code>char</code> מיוצג על ידי קוד (Unicode). אפשר לבצע עליו חשבון:</p>`,
            code: `char c = 'a';
c++;                               // 'b'
System.out.println((char)('A' + 2)); // C
System.out.println('7' - '0');       // 7  (המרת ספרה-תו למספר)
boolean isDigit = c >= '0' && c <= '9';`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `System.out.println("Hello".charAt(1));`, answer: "e", explain: "המיקום מתחיל מ-0: H=0, e=1." },
          { type: "output", q: "מה יודפס?", code: `System.out.println("computer".substring(3, 6));`, answer: "put", explain: "תווים במקומות 3,4,5: p,u,t." },
          { type: "output", q: "מה יודפס?", code: `String s = "abc";
String r = "";
for (int i = s.length() - 1; i >= 0; i--)
    r += s.charAt(i);
System.out.println(r);`, answer: "cba", explain: "הלולאה בונה את המחרוזת ההפוכה." },
          { type: "output", q: "מה יודפס?", code: `System.out.println("banana".indexOf('n'));`, answer: "2", explain: "b=0, a=1, n=2 – המופע הראשון." },
          { type: "mc", q: "איך בודקים נכון שהמחרוזות s1 ו-s2 שוות בתוכן?", options: ["s1 == s2", "s1.equals(s2)", "s1 = s2", "s1.compare(s2)"], ltr: true, answer: 1, explain: "equals משווה תוכן; == משווה הפניות." },
          { type: "output", q: "מה יודפס?", code: `String s = "programming";
int count = 0;
for (int i = 0; i < s.length(); i++)
    if (s.charAt(i) == 'm') count++;
System.out.println(count);`, answer: "2", explain: "יש שתי אותיות m במילה programming." },
          { type: "output", q: "מה יודפס?", code: `System.out.println('9' - '0' + 1);`, answer: "10", explain: "'9'-'0' = 9 (ההפרש בין הקודים), ועוד 1 = 10." }
        ]
      },
      {
        id: "arrays",
        title: "מערכים",
        intro: "מערך חד-ממדי: הגדרה, מעבר, מערך מונים והחלפה.",
        sections: [
          {
            h: "הגדרה וגישה",
            html: `<p>מערך הוא אוסף של תאים מאותו טיפוס, עם אינדקסים מ-0 עד <code>length-1</code>. במערך חדש כל תא מאותחל לערך ברירת מחדל (0 ל-int, false ל-boolean, null לעצמים).</p>`,
            code: `int[] arr = new int[5];     // 5 תאים, כולם 0
int[] nums = {4, 7, 1, 9};  // אתחול ישיר
System.out.println(nums.length);        // 4
System.out.println(nums[nums.length - 1]); // 9
for (int i = 0; i < nums.length; i++)
    System.out.print(nums[i] + " ");`
          },
          {
            h: "מערך מונים",
            html: `<p>תבנית חשובה: כשהערכים בטווח קטן (למשל ספרות 0-9), משתמשים במערך שבו התא ה-<i>d</i> סופר כמה פעמים הופיע <i>d</i>.</p>`,
            code: `int[] count = new int[10];
int n = 31337;
while (n > 0) {
    count[n % 10]++;
    n /= 10;
}
System.out.println(count[3]); // 3`
          },
          {
            h: "החלפה והיפוך",
            html: `<p>כדי להחליף שני תאים צריך משתנה עזר:</p>`,
            code: `public static void reverse(int[] arr) {
    for (int i = 0; i < arr.length / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = temp;
    }
}`
          },
          {
            h: "מערכים מועברים לפי הפניה",
            html: `<div class="callout">כשמעבירים מערך לפעולה, היא מקבלת הפניה לאותו מערך – לכן שינוי התאים בתוך הפעולה <b>כן</b> משפיע על המערך המקורי.</div>`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `int[] a = new int[3];
System.out.println(a[0] + a[2]);`, answer: "0", explain: "מערך int חדש מאותחל באפסים." },
          { type: "mc", q: "מה יקרה?", code: `int[] a = new int[5];
a[5] = 1;`, options: ["a[5] יהיה 1", "שגיאת זמן ריצה ArrayIndexOutOfBoundsException", "שגיאת קומפילציה", "המערך יגדל ל-6"], answer: 1, explain: "האינדקסים החוקיים הם 0 עד 4." },
          { type: "output", q: "מה יודפס?", code: `int[] a = {3, 8, 2, 6};
int max = a[0];
for (int i = 1; i < a.length; i++)
    if (a[i] > max) max = a[i];
System.out.println(max);`, answer: "8", explain: "חיפוש מקסימום סטנדרטי." },
          { type: "fill", q: "השלם:", code: `for (int i = 0; i < arr.____; i++)
    System.out.println(arr[i]);`, answer: ["length"], explain: "במערך length היא תכונה (בלי סוגריים), בניגוד ל-length() של מחרוזת." },
          { type: "output", q: "מה יודפס?", code: `public static void inc(int[] arr) {
    for (int i = 0; i < arr.length; i++)
        arr[i]++;
}
// ב-main:
int[] a = {1, 2, 3};
inc(a);
System.out.println(a[0] + a[1] + a[2]);`, answer: "9", explain: "המערך מועבר כהפניה ולכן משתנה: {2,3,4}, סכום 9." },
          { type: "output", q: "מה יודפס?", code: `int[] a = {5, 1, 4, 1, 5, 1};
int[] c = new int[6];
for (int i = 0; i < a.length; i++)
    c[a[i]]++;
System.out.println(c[1] + " " + c[5]);`, answer: "3 2", explain: "1 מופיע 3 פעמים ו-5 מופיע פעמיים." },
          { type: "output", q: "מה יודפס?", code: `int[] a = {1, 2, 3, 4, 5};
for (int i = 0; i < a.length - 1; i++)
    a[i] = a[i + 1];
System.out.println(a[0] + " " + a[4]);`, answer: "2 5", explain: "כל איבר מקבל את הבא אחריו (הזזה שמאלה): {2,3,4,5,5}." }
        ]
      },
      {
        id: "matrix",
        title: "מערך דו-ממדי",
        intro: "מטריצות: שורות, עמודות ואלכסונים.",
        sections: [
          {
            h: "הגדרה ומעבר",
            html: `<p><code>m.length</code> = מספר השורות, <code>m[0].length</code> = מספר העמודות. <code>m[i][j]</code> = שורה i, עמודה j.</p>`,
            code: `int[][] m = {
    {1, 2, 3},
    {4, 5, 6}
};
for (int i = 0; i < m.length; i++) {
    for (int j = 0; j < m[i].length; j++)
        System.out.print(m[i][j] + " ");
    System.out.println();
}`
          },
          {
            h: "אלכסונים במטריצה ריבועית",
            html: `<p>אלכסון ראשי: <code>i == j</code>. אלכסון משני: <code>i + j == n - 1</code>.</p>`,
            code: `int sum = 0;
for (int i = 0; i < n; i++)
    sum += m[i][i] + m[i][n - 1 - i];`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `int[][] m = {{1, 2, 3}, {4, 5, 6}};
System.out.println(m[1][2]);`, answer: "6", explain: "שורה 1 (השנייה), עמודה 2 (השלישית)." },
          { type: "output", q: "מה יודפס?", code: `int[][] m = new int[3][5];
System.out.println(m.length + " " + m[0].length);`, answer: "3 5", explain: "3 שורות, 5 עמודות." },
          { type: "output", q: "מה יודפס?", code: `int[][] m = {{1,2,3},{4,5,6},{7,8,9}};
int s = 0;
for (int i = 0; i < 3; i++)
    s += m[i][i];
System.out.println(s);`, answer: "15", explain: "האלכסון הראשי: 1+5+9 = 15." },
          { type: "mc", q: "איזה תנאי מתאר את האלכסון המשני במטריצה n×n?", options: ["i == j", "i + j == n", "i + j == n - 1", "i - j == 1"], ltr: true, answer: 2, explain: "בשורה 0 העמודה היא n-1, בשורה 1 העמודה n-2 וכו'." }
        ]
      }
    ]
  },
  {
    id: "oop",
    icon: "🧱",
    title: "עיצוב תוכנה – מחלקות ועצמים",
    desc: "מחלקות, בנאים, הכלה, הפניות, ירושה ופולימורפיזם",
    lessons: [
      {
        id: "classes",
        title: "מחלקות ועצמים",
        intro: "מחלקה היא תבנית; עצם הוא מופע שנוצר ממנה.",
        sections: [
          {
            h: "מבנה מחלקה",
            html: `<p>מחלקה כוללת <b>תכונות</b> (בדרך כלל <code>private</code>), <b>בנאי</b> (constructor) ו<b>פעולות</b>. הבנאי נקרא בשם המחלקה, ואין לו טיפוס מוחזר.</p>`,
            code: `public class Student {
    private String name;
    private int grade;

    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }

    public String getName() { return name; }
    public int getGrade() { return grade; }
    public void setGrade(int grade) { this.grade = grade; }

    public boolean isExcellent() {
        return grade >= 90;
    }
}`
          },
          {
            h: "יצירת עצמים",
            html: `<p>יוצרים עצם עם <code>new</code>, ופונים לפעולות שלו עם נקודה.</p>`,
            code: `Student s = new Student("Noa", 95);
System.out.println(s.getName());     // Noa
System.out.println(s.isExcellent()); // true
s.setGrade(80);`
          },
          {
            h: "this והסתרת מידע",
            html: `<p><code>this</code> מתייחס לעצם הנוכחי – שימושי כשלפרמטר יש אותו שם כמו לתכונה. תכונות <code>private</code> נגישות רק מתוך המחלקה – מבחוץ ניגשים דרך פעולות get/set. זה עיקרון <b>הכימוס</b> (encapsulation).</p>`
          }
        ],
        questions: [
          { type: "mc", q: "מה נכון לגבי בנאי (constructor)?", options: ["חייב להחזיר void", "שמו כשם המחלקה ואין לו טיפוס מוחזר", "חייב להיות private", "אפשר לקרוא לו רק פעם אחת בתוכנית"], answer: 1, explain: "בנאי נקרא בשם המחלקה ולא מצוין לו טיפוס מוחזר." },
          { type: "fill", q: "השלם יצירת עצם:", code: `Point p = ____ Point(1, 2);`, answer: ["new"], explain: "עצמים נוצרים עם new." },
          { type: "output", q: "מה יודפס?", code: `public class Point {
    private int x, y;
    public Point(int x, int y) { this.x = x; this.y = y; }
    public int getX() { return x; }
    public void move(int dx) { x += dx; }
}
// ב-main:
Point p = new Point(3, 4);
p.move(2);
p.move(-1);
System.out.println(p.getX());`, answer: "4", explain: "3+2-1 = 4." },
          { type: "mc", q: "בהינתן <code>private int grade;</code> במחלקה Student, מה יקרה ב-main?", code: `Student s = new Student("Avi", 70);
s.grade = 100;`, options: ["grade ישתנה ל-100", "שגיאת קומפילציה – grade פרטי", "שגיאת זמן ריצה", "יווצר עצם חדש"], answer: 1, explain: "לתכונה private אין גישה מחוץ למחלקה – צריך setGrade." },
          { type: "mc", q: "למה מתייחס this?", options: ["למחלקה עצמה", "לעצם הנוכחי שעליו הופעלה הפעולה", "לעצם האחרון שנוצר", "לפעולה main"], answer: 1, explain: "this הוא הפניה לעצם שעליו מופעלת הפעולה." }
        ]
      },
      {
        id: "tostring",
        title: "toString, get/set ובנאים",
        intro: "פעולות שירות, העמסת בנאים ובנאי מעתיק.",
        sections: [
          {
            h: "toString",
            html: `<p>הפעולה <code>toString</code> מחזירה ייצוג טקסטואלי של העצם. כשמדפיסים עצם, Java קוראת לה אוטומטית.</p>`,
            code: `public String toString() {
    return "(" + x + "," + y + ")";
}
// ...
Point p = new Point(3, 4);
System.out.println(p); // (3,4)`
          },
          {
            h: "כמה בנאים ובנאי מעתיק",
            html: `<p>אפשר להגדיר כמה בנאים עם פרמטרים שונים (העמסה – overloading). <b>בנאי מעתיק</b> יוצר עצם חדש עם אותם ערכים כמו עצם קיים.</p>`,
            code: `public Point() {           // בנאי ברירת מחדל
    this.x = 0;
    this.y = 0;
}
public Point(Point other) { // בנאי מעתיק
    this.x = other.x;
    this.y = other.y;
}`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `// במחלקה Point:
public String toString() {
    return "(" + x + "," + y + ")";
}
// ב-main:
Point p = new Point(3, 4);
System.out.println(p);`, answer: "(3,4)", explain: "println קורא ל-toString." },
          { type: "output", q: "מה יודפס?", code: `Point a = new Point(1, 1);
Point b = new Point(a);   // בנאי מעתיק
b.setX(9);
System.out.println(a.getX() + " " + b.getX());`, answer: "1 9", explain: "בנאי מעתיק יוצר עצם חדש ונפרד, לכן שינוי b לא משפיע על a." },
          { type: "mc", q: "מה קורה כשמדפיסים עצם שלא הוגדרה בו toString?", options: ["שגיאת קומפילציה", "מודפס שם המחלקה וקוד hash, למשל Point@1b6d3586", "לא מודפס כלום", "מודפסות כל התכונות"], answer: 1, explain: "מופעלת toString של Object שמחזירה שם מחלקה@hash." },
          { type: "fill", q: "השלם את פעולת ה-get:", code: `public int getAge() {
    ____ age;
}`, answer: ["return"], explain: "פעולת get מחזירה את ערך התכונה." }
        ]
      },
      {
        id: "refs",
        title: "הפניות ו-null",
        intro: "משתנה מטיפוס מחלקה מחזיק הפניה לעצם – לא את העצם עצמו.",
        sections: [
          {
            h: "שתי הפניות לאותו עצם",
            html: `<p>השמה של עצם לא מעתיקה אותו – היא מעתיקה את ההפניה. אחרי <code>b = a</code> שני המשתנים מצביעים על <b>אותו</b> עצם.</p>`,
            code: `Point a = new Point(1, 1);
Point b = a;
b.setX(5);
System.out.println(a.getX()); // 5 !`
          },
          {
            h: "== מול equals",
            html: `<p><code>==</code> בין עצמים בודק אם זו אותה הפניה. כדי להשוות תוכן כותבים פעולה <code>equals</code>.</p>`,
            code: `Point p1 = new Point(2, 3);
Point p2 = new Point(2, 3);
System.out.println(p1 == p2);  // false - שני עצמים שונים`
          },
          {
            h: "null",
            html: `<div class="callout">הפניה שלא מצביעה על שום עצם היא <code>null</code>. הפעלת פעולה על null גורמת ל-<code>NullPointerException</code>.</div>`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `Point a = new Point(1, 1);
Point b = a;
b.setX(5);
System.out.println(a.getX());`, answer: "5", explain: "a ו-b מצביעים על אותו עצם." },
          { type: "output", q: "מה יודפס?", code: `Point a = new Point(1, 1);
Point b = new Point(1, 1);
System.out.println(a == b);`, answer: "false", explain: "שני עצמים נפרדים – ההפניות שונות." },
          { type: "mc", q: "מה יקרה?", code: `Point p = null;
System.out.println(p.getX());`, options: ["יודפס 0", "יודפס null", "NullPointerException", "שגיאת קומפילציה"], answer: 2, explain: "אי אפשר להפעיל פעולה על הפניה ריקה." },
          { type: "output", q: "מה יודפס?", code: `public static void reset(Point p) {
    p.setX(0);
    p = new Point(7, 7);
}
// ב-main:
Point q = new Point(3, 3);
reset(q);
System.out.println(q.getX());`, answer: "0", explain: "setX משנה את העצם המקורי. ההשמה p = new ... משנה רק את המשתנה המקומי p." }
        ]
      },
      {
        id: "aggregation",
        title: "מערך עצמים והכלה",
        intro: "מחלקה שמכילה עצמים של מחלקה אחרת – למשל כיתה שמכילה תלמידים.",
        sections: [
          {
            h: "מערך של עצמים",
            html: `<p><code>new Student[30]</code> יוצר מערך של 30 <b>הפניות</b>, כולן <code>null</code>. צריך ליצור כל עצם בנפרד.</p>`,
            code: `Student[] arr = new Student[3];
arr[0] = new Student("Noa", 95);
arr[1] = new Student("Avi", 80);
arr[2] = new Student("Dan", 92);`
          },
          {
            h: "מחלקה מכילה",
            html: `<p>מחלקה <code>Classroom</code> מחזיקה מערך תלמידים ומונה של כמה תלמידים יש בפועל:</p>`,
            code: `public class Classroom {
    private Student[] students;
    private int count;

    public Classroom(int size) {
        students = new Student[size];
        count = 0;
    }

    public boolean add(Student s) {
        if (count == students.length) return false;
        students[count] = s;
        count++;
        return true;
    }

    public int countExcellent() {
        int c = 0;
        for (int i = 0; i < count; i++)
            if (students[i].getGrade() >= 90) c++;
        return c;
    }
}`
          }
        ],
        questions: [
          { type: "mc", q: "מה הערך של arr[0]?", code: `Student[] arr = new Student[30];`, options: ["תלמיד ריק", "null", "0", "שגיאה"], answer: 1, explain: "מערך עצמים חדש מכיל הפניות null." },
          { type: "output", q: "מה יודפס?", code: `Student[] arr = {
    new Student("Noa", 95),
    new Student("Avi", 80),
    new Student("Dan", 92)
};
int c = 0;
for (int i = 0; i < arr.length; i++)
    if (arr[i].getGrade() >= 90) c++;
System.out.println(c);`, answer: "2", explain: "Noa ו-Dan." },
          { type: "mc", q: "למה במחלקה Classroom הלולאה רצה עד count ולא עד students.length?", options: ["זה יותר מהיר", "התאים אחרי count הם null, ופנייה אליהם תגרום NullPointerException", "length לא קיים", "אין סיבה"], answer: 1, explain: "רק count התאים הראשונים מכילים עצמים." },
          { type: "output", q: "מה יודפס?", code: `Classroom c = new Classroom(2);
System.out.println(c.add(new Student("A", 90)));
System.out.println(c.add(new Student("B", 70)));
System.out.println(c.add(new Student("C", 99)));`, answer: "true\ntrue\nfalse", explain: "יש מקום רק ל-2 תלמידים, ההוספה השלישית נכשלת." }
        ]
      },
      {
        id: "inheritance",
        title: "ירושה ופולימורפיזם",
        intro: "extends, super, דריסת פעולות והמחלקה Object.",
        sections: [
          {
            h: "ירושה",
            html: `<p>מחלקה יורשת (<code>extends</code>) מקבלת את התכונות והפעולות של מחלקת הבסיס. הבנאי שלה קורא לבנאי של מחלקת הבסיס עם <code>super(...)</code> – <b>בשורה הראשונה</b>. תכונות <code>protected</code> נגישות גם למחלקות היורשות.</p>`,
            code: `public class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    public String sound() { return "..."; }
}

public class Dog extends Animal {
    public Dog(String name) { super(name); }
    @Override
    public String sound() { return "Woof"; }
    public void fetch() { System.out.println(name + " fetches!"); }
}`
          },
          {
            h: "פולימורפיזם",
            html: `<p>הפניה מטיפוס הבסיס יכולה להצביע על עצם מהמחלקה היורשת. איזו פעולה תופעל נקבע לפי <b>הטיפוס האמיתי של העצם</b> בזמן ריצה. אבל הקומפיילר מאפשר לקרוא רק לפעולות שקיימות ב<b>טיפוס ההפניה</b>.</p>`,
            code: `Animal a = new Dog("Rex");
System.out.println(a.sound()); // Woof
// a.fetch();                  // שגיאת קומפילציה!
((Dog) a).fetch();             // המרה מפורשת - תקין
if (a instanceof Dog) { ... }`
          },
          {
            h: "Object",
            html: `<div class="callout">כל מחלקה ב-Java יורשת (במישרין או בעקיפין) מהמחלקה <code>Object</code>, ולכן לכל עצם יש <code>toString</code> ו-<code>equals</code>.</div>`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `Animal a = new Dog("Rex");
System.out.println(a.sound());`, answer: "Woof", explain: "הפעולה נקבעת לפי הטיפוס האמיתי של העצם – Dog." },
          { type: "mc", q: "בהינתן <code>Animal a = new Dog(\"Rex\");</code>, מה יקרה בשורה <code>a.fetch();</code>?", options: ["Rex fetches!", "שגיאת קומפילציה – ל-Animal אין fetch", "שגיאת זמן ריצה", "לא יקרה כלום"], answer: 1, explain: "הקומפיילר בודק לפי טיפוס ההפניה (Animal)." },
          { type: "mc", q: "מה עושה <code>super(name)</code> בבנאי של Dog?", options: ["יוצר עצם Animal נפרד", "קורא לבנאי של מחלקת הבסיס", "קורא ל-toString", "מוחק את התכונה name"], answer: 1, explain: "super(...) מפעיל את בנאי מחלקת האב, וחייב להיות בשורה הראשונה." },
          { type: "mc", q: "מאיזו מחלקה יורשות כל המחלקות ב-Java?", options: ["Main", "Class", "Object", "String"], ltr: true, answer: 2, explain: "Object היא שורש עץ הירושה." },
          { type: "output", q: "מה יודפס?", code: `class A {
    public int f() { return 1; }
    public int g() { return f() * 10; }
}
class B extends A {
    public int f() { return 2; }
}
// ב-main:
A x = new B();
System.out.println(x.g());`, answer: "20", explain: "g מוגדרת ב-A, אבל הקריאה ל-f בתוכה מופעלת על עצם B, ולכן f מחזירה 2." }
        ]
      }
    ]
  },
  {
    id: "ds",
    icon: "🌳",
    title: "מבני נתונים",
    desc: "רקורסיה, יעילות, שרשרת חוליות, מחסנית, תור ועץ בינארי",
    lessons: [
      {
        id: "recursion",
        title: "רקורסיה",
        intro: "פעולה שקוראת לעצמה – עם תנאי עצירה וצעד שמקטין את הבעיה.",
        sections: [
          {
            h: "שני רכיבים חובה",
            html: `<ol><li><b>תנאי עצירה</b> (מקרה בסיס) – מקרה פשוט שעונים עליו ישירות.</li><li><b>צעד רקורסיבי</b> – קריאה לעצמה עם בעיה קטנה יותר.</li></ol>
<div class="callout">בלי תנאי עצירה – הרקורסיה אינסופית ומסתיימת ב-<code>StackOverflowError</code>.</div>`,
            code: `public static int fact(int n) {
    if (n <= 1) return 1;          // תנאי עצירה
    return n * fact(n - 1);        // צעד רקורסיבי
}

public static int sumDigits(int n) {
    if (n == 0) return 0;
    return n % 10 + sumDigits(n / 10);
}`
          },
          {
            h: "סדר ההדפסה",
            html: `<p>חשוב לשים לב אם ההדפסה היא <b>לפני</b> או <b>אחרי</b> הקריאה הרקורסיבית:</p>`,
            code: `public static void down(int n) {
    if (n == 0) return;
    System.out.print(n);   // לפני הקריאה
    down(n - 1);
}   // down(3) -> 321

public static void up(int n) {
    if (n == 0) return;
    up(n - 1);
    System.out.print(n);   // אחרי הקריאה
}   // up(3) -> 123`
          },
          {
            h: "רקורסיה על מערך",
            html: `<p>מוסיפים פרמטר של אינדקס שמתקדם בכל קריאה:</p>`,
            code: `public static int sum(int[] arr, int i) {
    if (i == arr.length) return 0;
    return arr[i] + sum(arr, i + 1);
}
// sum(arr, 0)`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `public static int f(int n) {
    if (n == 0) return 0;
    return n % 10 + f(n / 10);
}
// ב-main:
System.out.println(f(352));`, answer: "10", explain: "סכום הספרות: 3+5+2 = 10." },
          { type: "output", q: "מה יודפס?", code: `public static int fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}
// ב-main:
System.out.println(fact(5));`, answer: "120", explain: "5·4·3·2·1 = 120." },
          { type: "output", q: "מה יודפס?", code: `public static void p(int n) {
    if (n > 0) {
        p(n - 1);
        System.out.print(n);
    }
}
// ב-main:
p(3);`, answer: "123", explain: "ההדפסה אחרי הקריאה, לכן מודפס בדרך חזרה: 1, 2, 3." },
          { type: "output", q: "מה יודפס?", code: `public static int m(int a, int b) {
    if (b == 0) return 0;
    return a + m(a, b - 1);
}
// ב-main:
System.out.println(m(4, 3));`, answer: "12", explain: "הפעולה מחשבת a·b על ידי חיבור חוזר: 4+4+4." },
          { type: "mc", q: "מה יקרה בקריאה <code>f(5)</code>?", code: `public static int f(int n) {
    return n + f(n - 1);
}`, options: ["יוחזר 15", "יוחזר 0", "StackOverflowError – אין תנאי עצירה", "שגיאת קומפילציה"], answer: 2, explain: "אין מקרה בסיס, ולכן הרקורסיה לא נעצרת." },
          { type: "output", q: "מה יודפס?", code: `public static int g(int n) {
    if (n < 2) return n;
    return g(n - 1) + g(n - 2);
}
// ב-main:
System.out.println(g(6));`, answer: "8", explain: "זו סדרת פיבונאצ'י: 0,1,1,2,3,5,8 – g(6)=8." },
          { type: "output", q: "מה יודפס?", code: `public static String r(String s) {
    if (s.length() == 0) return "";
    return r(s.substring(1)) + s.charAt(0);
}
// ב-main:
System.out.println(r("java"));`, answer: "avaj", explain: "היפוך מחרוזת: התו הראשון מוצמד לסוף ההיפוך של השאר." }
        ]
      },
      {
        id: "complexity",
        title: "יעילות (סיבוכיות)",
        intro: "כמה צעדים מבצע אלגוריתם כתלות בגודל הקלט n – סימון O.",
        sections: [
          {
            h: "סדרי גודל נפוצים",
            html: `<table class="api-table"><tr><th>סיבוכיות</th><th>דוגמה</th></tr>
<tr><td>O(1)</td><td>גישה לתא במערך, push/pop</td></tr>
<tr><td>O(log n)</td><td>חיפוש בינארי, לולאה שמכפילה/חוצה</td></tr>
<tr><td>O(n)</td><td>לולאה אחת על המערך</td></tr>
<tr><td>O(n log n)</td><td>מיון מיזוג</td></tr>
<tr><td>O(n²)</td><td>לולאות מקוננות, מיון בועות/בחירה</td></tr></table>`
          },
          {
            h: "כללים",
            html: `<ul><li>לולאות <b>רצופות</b> (אחת אחרי השנייה) – <b>מחברים</b>: O(n)+O(n) = O(n).</li><li>לולאות <b>מקוננות</b> – <b>כופלים</b>: O(n)·O(n) = O(n²).</li><li>מתעלמים מקבועים: O(3n) = O(n).</li></ul>`,
            code: `// O(log n)
for (int i = 1; i < n; i *= 2) { ... }

// חיפוש בינארי במערך ממוין - O(log n)
int low = 0, high = arr.length - 1;
while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == x) return mid;
    if (arr[mid] < x) low = mid + 1;
    else high = mid - 1;
}`
          }
        ],
        questions: [
          { type: "mc", q: "מה סיבוכיות הקוד?", code: `for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++)
        sum++;`, options: ["O(n)", "O(n²)", "O(log n)", "O(2n)"], ltr: true, answer: 1, explain: "לולאות מקוננות – n·n." },
          { type: "mc", q: "מה סיבוכיות הקוד?", code: `for (int i = 1; i < n; i *= 2)
    sum++;`, options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], ltr: true, answer: 2, explain: "i מוכפל בכל צעד, ולכן מספר הצעדים הוא log₂n." },
          { type: "mc", q: "מה סיבוכיות הקוד?", code: `for (int i = 0; i < n; i++)
    sum++;
for (int j = 0; j < n; j++)
    sum--;`, options: ["O(n)", "O(n²)", "O(2)", "O(log n)"], ltr: true, answer: 0, explain: "לולאות רצופות מחברים: 2n = O(n)." },
          { type: "mc", q: "מה סיבוכיות חיפוש בינארי במערך ממוין בגודל n?", options: ["O(1)", "O(log n)", "O(n)", "O(n²)"], ltr: true, answer: 1, explain: "בכל צעד טווח החיפוש נחצה." },
          { type: "mc", q: "מה סיבוכיות הקוד?", code: `for (int i = 0; i < n; i++)
    for (int j = 0; j < 5; j++)
        sum++;`, options: ["O(n²)", "O(5)", "O(n)", "O(log n)"], ltr: true, answer: 2, explain: "הלולאה הפנימית רצה מספר קבוע של פעמים: 5n = O(n)." }
        ]
      },
      {
        id: "node",
        title: "שרשרת חוליות – Node<T>",
        intro: "מבנה דינמי שבו כל חוליה מחזיקה ערך והפניה לחוליה הבאה.",
        sections: [
          {
            h: "הממשק של Node<T>",
            html: `<table class="api-table"><tr><th>פעולה</th><th>תיאור</th></tr>
<tr><td>Node(T value)</td><td>חוליה חדשה בלי המשך (next = null)</td></tr>
<tr><td>Node(T value, Node&lt;T&gt; next)</td><td>חוליה חדשה שמצביעה על next</td></tr>
<tr><td>T getValue()</td><td>הערך בחוליה</td></tr>
<tr><td>Node&lt;T&gt; getNext()</td><td>החוליה הבאה</td></tr>
<tr><td>void setValue(T v)</td><td>שינוי הערך</td></tr>
<tr><td>void setNext(Node&lt;T&gt; n)</td><td>שינוי ההפניה לבאה</td></tr>
<tr><td>boolean hasNext()</td><td>האם יש חוליה הבאה</td></tr></table>`
          },
          {
            h: "יצירה ומעבר",
            html: `<p>יוצרים שרשרת מהסוף להתחלה, ועוברים עליה עם הפניה <code>p</code> שמתקדמת:</p>`,
            code: `Node<Integer> chain = new Node<>(1, new Node<>(2, new Node<>(3)));
// 1 -> 2 -> 3 -> null

Node<Integer> p = chain;
while (p != null) {
    System.out.print(p.getValue() + " ");
    p = p.getNext();
}`
          },
          {
            h: "הכנסה ומחיקה",
            html: `<div class="callout">בהכנסה – <b>סדר הפעולות קריטי</b>: קודם מחברים את החוליה החדשה להמשך, ורק אחר כך מחברים אליה את p.</div>`,
            code: `// הכנסת x אחרי החוליה p
Node<Integer> q = new Node<>(x);
q.setNext(p.getNext());
p.setNext(q);

// מחיקת החוליה שאחרי p
p.setNext(p.getNext().getNext());

// הכנסה בתחילת השרשרת
chain = new Node<>(x, chain);`
          },
          {
            h: "פעולה טיפוסית: אורך שרשרת",
            code: `public static int length(Node<Integer> chain) {
    int count = 0;
    Node<Integer> p = chain;
    while (p != null) {
        count++;
        p = p.getNext();
    }
    return count;
}`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `Node<Integer> n3 = new Node<>(3);
Node<Integer> n2 = new Node<>(2, n3);
Node<Integer> n1 = new Node<>(1, n2);
Node<Integer> p = n1;
while (p != null) {
    System.out.print(p.getValue());
    p = p.getNext();
}`, answer: "123", explain: "המעבר מתחיל ב-n1 ומתקדם עד null." },
          { type: "fill", q: "השלם את תנאי המעבר על כל השרשרת:", code: `Node<Integer> p = chain;
while (p ____ null) {
    p = p.getNext();
}`, answer: ["!="], explain: "ממשיכים כל עוד p מצביע על חוליה." },
          { type: "mc", q: "רוצים להכניס חוליה q אחרי p. מה הסדר הנכון?", options: ["p.setNext(q); q.setNext(p.getNext());", "q.setNext(p.getNext()); p.setNext(q);", "q.setNext(p); p.setNext(q);", "p = q;"], ltr: true, answer: 1, explain: "אם קודם נחבר את p ל-q, נאבד את ההפניה להמשך השרשרת." },
          { type: "mc", q: "איזו שורה מוחקת את החוליה שאחרי p?", options: ["p = p.getNext();", "p.setNext(null);", "p.setNext(p.getNext().getNext());", "p.getNext().setNext(p);"], ltr: true, answer: 2, explain: "מדלגים על החוליה הבאה ומחברים את p לזו שאחריה." },
          { type: "output", q: "מה יודפס?", code: `Node<Integer> c = new Node<>(5, new Node<>(8, new Node<>(2, new Node<>(9))));
int s = 0;
Node<Integer> p = c;
while (p != null) {
    if (p.getValue() % 2 == 0) s += p.getValue();
    p = p.getNext();
}
System.out.println(s);`, answer: "10", explain: "סכום הערכים הזוגיים: 8+2 = 10." },
          { type: "output", q: "מה יודפס?", code: `Node<Integer> c = new Node<>(1, new Node<>(2, new Node<>(3)));
c = new Node<>(0, c);
c.getNext().setNext(c.getNext().getNext().getNext());
Node<Integer> p = c;
while (p != null) {
    System.out.print(p.getValue());
    p = p.getNext();
}`, answer: "013", explain: "אחרי הכנסת 0 בהתחלה: 0→1→2→3. השורה השלישית מוחקת את החוליה שאחרי 1 (כלומר 2)." }
        ]
      },
      {
        id: "stack",
        title: "מחסנית – Stack<T>",
        intro: "LIFO – האחרון שנכנס הוא הראשון שיוצא.",
        sections: [
          {
            h: "הממשק של Stack<T>",
            html: `<table class="api-table"><tr><th>פעולה</th><th>תיאור</th></tr>
<tr><td>Stack()</td><td>מחסנית ריקה</td></tr>
<tr><td>void push(T x)</td><td>הכנסה לראש המחסנית</td></tr>
<tr><td>T pop()</td><td>הוצאה והחזרה של הראש</td></tr>
<tr><td>T top()</td><td>החזרת הראש בלי להוציא</td></tr>
<tr><td>boolean isEmpty()</td><td>האם המחסנית ריקה</td></tr></table>
<div class="callout">לפני <code>pop</code> או <code>top</code> תמיד בודקים <code>isEmpty()</code>!</div>`,
            code: `Stack<Integer> s = new Stack<>();
s.push(1);
s.push(2);
s.push(3);
System.out.println(s.pop()); // 3
System.out.println(s.top()); // 2`
          },
          {
            h: "מעבר על מחסנית בלי להרוס אותה",
            html: `<p>אין דרך "להציץ" לאיברים פנימיים. כדי לעבור על המחסנית מוציאים את האיברים למחסנית עזר, ובסוף מחזירים אותם:</p>`,
            code: `public static int size(Stack<Integer> s) {
    Stack<Integer> temp = new Stack<>();
    int count = 0;
    while (!s.isEmpty()) {
        temp.push(s.pop());
        count++;
    }
    while (!temp.isEmpty())
        s.push(temp.pop());   // שחזור
    return count;
}`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `Stack<Integer> s = new Stack<>();
s.push(1);
s.push(2);
s.push(3);
System.out.println(s.pop());
System.out.println(s.top());`, answer: "3\n2", explain: "pop מוציא את 3; top מחזיר את 2 בלי להוציא." },
          { type: "output", q: "מה יודפס?", code: `Stack<Integer> s = new Stack<>();
s.push(5); s.push(8); s.pop();
s.push(2); s.push(7); s.pop(); s.pop();
System.out.println(s.top());`, answer: "5", explain: "[5] → [5,8] → [5] → [5,2] → [5,2,7] → [5,2] → [5]." },
          { type: "mc", q: "איזה עיקרון מתאר מחסנית?", options: ["FIFO – ראשון נכנס ראשון יוצא", "LIFO – אחרון נכנס ראשון יוצא", "גישה ישירה לכל איבר", "ממוין תמיד"], answer: 1, explain: "Last In First Out." },
          { type: "output", q: "מה יודפס?", code: `Stack<Character> s = new Stack<>();
String str = "java";
for (int i = 0; i < str.length(); i++)
    s.push(str.charAt(i));
while (!s.isEmpty())
    System.out.print(s.pop());`, answer: "avaj", explain: "מחסנית הופכת את הסדר." },
          { type: "fill", q: "השלם לולאה שמרוקנת את המחסנית:", code: `while (____)
    s.pop();`, answer: ["!s.isEmpty()"], explain: "ממשיכים כל עוד המחסנית לא ריקה." },
          { type: "mc", q: "למה פעולה שמקבלת מחסנית צריכה בדרך כלל לשחזר אותה בסוף?", options: ["כי אחרת יש שגיאת קומפילציה", "כי המחסנית מועברת כהפניה, והוצאת האיברים משנה את המחסנית המקורית", "כדי שהפעולה תהיה מהירה", "אין צורך"], answer: 1, explain: "המחסנית היא עצם – הפעולה עובדת על אותה מחסנית שהועברה." }
        ]
      },
      {
        id: "queue",
        title: "תור – Queue<T>",
        intro: "FIFO – הראשון שנכנס הוא הראשון שיוצא.",
        sections: [
          {
            h: "הממשק של Queue<T>",
            html: `<table class="api-table"><tr><th>פעולה</th><th>תיאור</th></tr>
<tr><td>Queue()</td><td>תור ריק</td></tr>
<tr><td>void insert(T x)</td><td>הכנסה לסוף התור</td></tr>
<tr><td>T remove()</td><td>הוצאה והחזרה של האיבר בראש התור</td></tr>
<tr><td>T head()</td><td>החזרת האיבר בראש בלי להוציא</td></tr>
<tr><td>boolean isEmpty()</td><td>האם התור ריק</td></tr></table>`,
            code: `Queue<Integer> q = new Queue<>();
q.insert(1);
q.insert(2);
q.insert(3);
System.out.println(q.remove()); // 1
System.out.println(q.head());   // 2`
          },
          {
            h: "מעבר על תור ושחזור",
            html: `<p>אפשר להשתמש בתור עזר. דרך נוספת: להכניס סימן (<code>null</code>) לסוף, ולסובב את האיברים עד שמגיעים אליו:</p>`,
            code: `public static int sum(Queue<Integer> q) {
    Queue<Integer> temp = new Queue<>();
    int s = 0;
    while (!q.isEmpty()) {
        int x = q.remove();
        s += x;
        temp.insert(x);
    }
    while (!temp.isEmpty())
        q.insert(temp.remove());
    return s;
}`
          }
        ],
        questions: [
          { type: "output", q: "מה יודפס?", code: `Queue<Integer> q = new Queue<>();
q.insert(1);
q.insert(2);
q.insert(3);
System.out.println(q.remove());
System.out.println(q.head());`, answer: "1\n2", explain: "התור מוציא לפי סדר ההכנסה." },
          { type: "mc", q: "איזה עיקרון מתאר תור?", options: ["LIFO", "FIFO", "ממוין", "אקראי"], ltr: true, answer: 1, explain: "First In First Out – כמו תור בקופה." },
          { type: "output", q: "מה יודפס?", code: `Queue<Integer> q = new Queue<>();
for (int i = 1; i <= 4; i++)
    q.insert(i);
for (int i = 0; i < 2; i++)
    q.insert(q.remove());
System.out.println(q.head());`, answer: "3", explain: "1 ו-2 עוברים לסוף: התור הוא 3,4,1,2." },
          { type: "output", q: "מה יודפס?", code: `Queue<Integer> q = new Queue<>();
Stack<Integer> s = new Stack<>();
for (int i = 1; i <= 3; i++)
    q.insert(i);
while (!q.isEmpty())
    s.push(q.remove());
while (!s.isEmpty())
    System.out.print(s.pop());`, answer: "321", explain: "מעבר דרך מחסנית הופך את הסדר." },
          { type: "mc", q: "איזו פעולה מחזירה את האיבר הראשון בתור בלי להוציא אותו?", options: ["q.remove()", "q.head()", "q.top()", "q.first()"], ltr: true, answer: 1, explain: "head מחזירה את הראש; remove גם מוציאה אותו." }
        ]
      },
      {
        id: "bintree",
        title: "עץ בינארי – BinNode<T>",
        intro: "לכל צומת יש ערך, תת-עץ שמאלי ותת-עץ ימני. כמעט כל פעולה על עץ היא רקורסיבית.",
        sections: [
          {
            h: "הממשק של BinNode<T>",
            html: `<table class="api-table"><tr><th>פעולה</th><th>תיאור</th></tr>
<tr><td>BinNode(T value)</td><td>צומת עלה</td></tr>
<tr><td>BinNode(BinNode&lt;T&gt; left, T value, BinNode&lt;T&gt; right)</td><td>צומת עם ילדים</td></tr>
<tr><td>T getValue()</td><td>הערך בצומת</td></tr>
<tr><td>BinNode&lt;T&gt; getLeft() / getRight()</td><td>הבן השמאלי / הימני</td></tr>
<tr><td>setLeft / setRight / setValue</td><td>שינוי</td></tr>
<tr><td>boolean hasLeft() / hasRight()</td><td>האם קיים בן שמאלי / ימני</td></tr></table>`
          },
          {
            h: "סריקות",
            html: `<p>בעץ הבא – שורש 1, משמאלו 2 (עם ילדים 4 ו-5), ומימינו 3:</p>
<pre class="code" style="text-align:center">      1
     / \\
    2   3
   / \\
  4   5</pre>
<ul><li><b>תחילית (pre-order)</b> – שורש, שמאל, ימין: <code>1 2 4 5 3</code></li>
<li><b>תוכית (in-order)</b> – שמאל, שורש, ימין: <code>4 2 5 1 3</code></li>
<li><b>סופית (post-order)</b> – שמאל, ימין, שורש: <code>4 5 2 3 1</code></li></ul>`,
            code: `public static void preOrder(BinNode<Integer> t) {
    if (t == null) return;
    System.out.print(t.getValue() + " ");
    preOrder(t.getLeft());
    preOrder(t.getRight());
}`
          },
          {
            h: "פעולות רקורסיביות טיפוסיות",
            code: `public static int count(BinNode<Integer> t) {
    if (t == null) return 0;
    return 1 + count(t.getLeft()) + count(t.getRight());
}

public static int height(BinNode<Integer> t) {
    if (t == null) return -1;
    return 1 + Math.max(height(t.getLeft()), height(t.getRight()));
}

public static boolean isLeaf(BinNode<Integer> t) {
    return !t.hasLeft() && !t.hasRight();
}`
          },
          {
            h: "עץ חיפוש בינארי",
            html: `<div class="callout">בעץ חיפוש בינארי, כל הערכים בתת-העץ השמאלי קטנים מהשורש, וכל הערכים בימני גדולים ממנו. סריקה <b>תוכית</b> של עץ חיפוש מחזירה את הערכים <b>ממוינים</b>.</div>`
          }
        ],
        questions: [
          { type: "output", q: "בעץ מההסבר (1 בשורש, 2 משמאל עם ילדים 4,5, ו-3 מימין) – מה תדפיס סריקה תחילית?", code: `System.out.print(t.getValue() + " ");
preOrder(t.getLeft());
preOrder(t.getRight());`, answer: "1 2 4 5 3", explain: "שורש, שמאל, ימין." },
          { type: "output", q: "באותו עץ – מה תדפיס סריקה תוכית?", code: `inOrder(t.getLeft());
System.out.print(t.getValue() + " ");
inOrder(t.getRight());`, answer: "4 2 5 1 3", explain: "שמאל, שורש, ימין." },
          { type: "output", q: "באותו עץ – מה תדפיס סריקה סופית?", code: `postOrder(t.getLeft());
postOrder(t.getRight());
System.out.print(t.getValue() + " ");`, answer: "4 5 2 3 1", explain: "שמאל, ימין, שורש." },
          { type: "output", q: "מה יודפס?", code: `public static int sum(BinNode<Integer> t) {
    if (t == null) return 0;
    return t.getValue() + sum(t.getLeft()) + sum(t.getRight());
}
// ב-main:
BinNode<Integer> t = new BinNode<>(
    new BinNode<>(new BinNode<>(4), 2, new BinNode<>(5)),
    1,
    new BinNode<>(3));
System.out.println(sum(t));`, answer: "15", explain: "1+2+3+4+5 = 15." },
          { type: "mc", q: "איזו סריקה של עץ חיפוש בינארי מחזירה את הערכים בסדר עולה?", options: ["תחילית", "תוכית", "סופית", "אף אחת"], answer: 1, explain: "שמאל (קטנים) → שורש → ימין (גדולים)." },
          { type: "output", q: "מה יודפס? (אותו עץ t)", code: `public static int leaves(BinNode<Integer> t) {
    if (t == null) return 0;
    if (!t.hasLeft() && !t.hasRight()) return 1;
    return leaves(t.getLeft()) + leaves(t.getRight());
}
// ב-main:
System.out.println(leaves(t));`, answer: "3", explain: "העלים הם 4, 5 ו-3." },
          { type: "fill", q: "השלם את תנאי העצירה:", code: `public static int count(BinNode<Integer> t) {
    if (t == ____) return 0;
    return 1 + count(t.getLeft()) + count(t.getRight());
}`, answer: ["null"], explain: "עץ ריק (null) מכיל 0 צמתים." }
        ]
      }
    ]
  }
];
