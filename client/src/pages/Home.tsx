import { useState } from "react";
import { MapPin, Clock, Gauge, ChevronDown, Facebook, Instagram, Youtube } from "lucide-react";

/**
 * Home Page - N688TW Global Aviation Mission (Single Page)
 * 
 * Design Philosophy: Minimalist Aerospace Futurism
 * - Deep black background with neon blue and gold accents
 * - Single page layout with smooth scrolling sections
 * - Interactive world map showing flight route
 * - Complete Facebook content integration with endorsements
 */

export default function Home() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const endorsements = [
    { name: "王立祺", title: "航太工程師、航空史作家", quote: "得知睿哲即將駕機環繞世界，我內心充滿欽羨與敬佩。五十多年前，當我剛取得飛行執照時，也曾懷抱這樣的夢想，卻因缺乏資源與後援而難以實現。擁有自己的飛機、強大的支持系統，對當時的我而言是遙不可及的。然而，如今睿哲即將踏上這趟旅程，不僅是實現個人夢想，也像是在替我圓夢。我誠摯祝福並真實質助，並邀請大家一起支持他，讓這次飛行不僅成就個人夢想，更書寫台灣航空史的新篇章！" },
    { name: "甘芝真", title: "聯合報航空專題記者", quote: "睿哲即將挑戰自駕小飛機環球飛行，對他而言，這不僅是一飛飛行技能的極限挑戰，更是一段實現夢想的旅程。環機環球飛行其實真的是我的夢想，沒想到睿哲就要去實踐了，寄寳鼓舞了我！深深佩服他的決心與實踐力，祝福他在這段充滿挑戰的旅程中一切順利，讓我們一起支持他，替他加油，見證這非凡過程。" },
    { name: "朱玉娟", title: "廣播金鐘獎得主、資深媒體人", quote: "長年來，我透過廣播節目記錄台灣的生命力，見證無數勇敢追夢、突破困境的人。如今，睿哲正籌辦一場壯闊的自駕小飛機環球飛行，這不僅是對個人極限的挑戰，更是一場傳遞勇氣與探索精神的旅程。他的飛行，將激勵更多人勇敢逐夢，讓世界看見台灣的天空夢想。這趟旅程，需要我們的關注與支持！讓我們攜手喝采，見證台灣飛行夢想的無限可能！" },
    { name: "林博雄", title: "國立臺灣大學大氣系教授", quote: "作為長期關注航空發展的教育工作者與愛好者，我曾參與台、日的颱風環流和颱風眼的飛機飛航計畫，並投身航空氣象相關研究與教學。睿哲大學時與我結識，展現出對飛行的極大熱忱與探索精神，我們更曾一同前往非洲進行研究。如今，他即將駕駛自家飛機環遊世界，這趟旅程充滿挑戰，需要技術、毅力與資源的支持。我誠摯邀請大家，一起幫助睿哲，讓他順利完成壯舉，為台灣的歷史寫下嶄新的一頁！" },
    { name: "林曉峰", title: "阿聯酋航空臺灣貨運經理", quote: "我和睿哲都愛飛機，但我們的方式不同。我喜歡收集模型，家裡有些收藏其來自睿哲的創愛。他不僅懂飛機，還願意分享。這次，他將駕駛小飛機挑戰環球飛行，這不是一場單純的旅行，而是一次對夢想的實踐與突破。我相信，這樣的勇氣值得我們支持。邀請大家一起關注這趟旅程，為台灣的夢想家嘖聲，讓睿哲的飛行不只是個人的挑戰，而是一場屬於所有熱愛飛行、熱愛夢想者的勝利！" },
    { name: "周德九", title: "2018年私人商務機環球飛行《極限挑戰: 飛機環球16天全紀錄》作者", quote: "我曾在2018年完成了我的環球飛行。當時這趟旅程對我來說是一生中最難忘的經歷，我從中學到了很多，也見識了世界各地的美景和人情。今天，我的朋友睿哲即將踏上這條同樣充滿挑戰與冒險的環球飛行之路。他的決心與勇氣讓我深受感動，也讓我相信，這不僅僅是一趟飛行，它更是一個關於夢想與堅持的故事。" },
    { name: "施賢琴", title: "廣播金鐘獎得主、資深媒體人", quote: "還記得幾年前，睿哲在節目中透過廣播與大家分享他的飛行夢想，當時，他興奮地說著：「有一天，我會親自駕駛飛機環遊世界！」沒想到，這一天真的要來了！現在，睿哲即將用行動向大家證明：只要勇敢踏出第一步，夢想真的可以飛得更遠！這趟航旅不僅是他的人挑戰，更是台灣飛行歷史上的重要時刻。讓我們一起支持睿哲，為他的環球飛行加油，讓這份勇氣與夢想飛得更高、更遠！" },
    { name: "郭瑞祥", title: "臺大管院院長、健行科大校長", quote: "睿哲的環球飛行計畫不僅是一場個人的壯舉，更是一個展現勇氣與創新的象徵。他選擇用飛行來開啟人生的嶄新旅程，正如我在《人生第二曲線》中所提到的，真正的成長來自於跳脫舒適圈，勇敢探索新的可能。我就像邀請大家一起支持睿哲，幫助他完成這趟飛行旅程，讓更多人看見勇氣、創新與堅持的力量。讓我們攜手推動這個充滿意義的挑戰，見證他如何在天空中描繪出自己的第二曲線！" },
    { name: "郭樂興", title: "紀錄片《翻滾吧！男人》導演", quote: "我認識睿哲多年，他是一個充滿熱情與行動力的人。這次，他即將駕駛小飛機挑戰環球飛行，這不只是個人的夢想，更是一場勇敢披荊斬棘限的旅程。他的堅持與專業精神，讓我深信這不僅是一趟飛行，更是一次激勵人心的冒險。睿哲的故事值得被更多人看見，也值得我們一起支持。我希望大家能夠關注、分享，甚至參與這項計劃，讓這趟環球飛行不只是個人的成就，而是台灣共同的驕傲！" },
    { name: "莊豐嘉", title: "華視前總經理、資深媒體人", quote: "睿哲即將展開一場極具挑戰的環球飛行計畫，這不僅是對個人極限的挑戰，也是對臺灣航空精神的極大詮釋。睿哲的環球飛行計畫，不僅僅是一個冒險故事，它代表了勇氣、毅力與追求夢想的精神。他的努力不僅會帶來獨一無二的飛行經歷，更將把臺灣的飛行夢帶向國際舞台。我深信，這樣的計畫需要我們的支持和關注。" },
    { name: "張玉穗", title: "《熟女OL的飛行員夢想》作者", quote: "飛行是許多人的夢想，但能夠真正實現的人卻寥寥無幾。睿哲便是我認識的少數幾位，既充滿實踐力又具有堅定決心的代表之一。他不僅熱愛飛行，這些年來也不遺餘力分享航空知識新知。這次環球飛行計畫，是睿哲挑戰更大夢想的重要一步，將全面考驗其專業知識、應變能力、體能、毅力與決心，也提供台灣與全球熱愛飛行同好交流互動之大好機會。希望大家能一同支持睿哲，助力這次壯舉順利啟航！" },
    { name: "黃明祐", title: "2015年單引擎飛機環球飛行", quote: "我曾駕駛單引擎型飛機環球飛行，深知這項挑戰的艱辛與意義。作為一名在美國擁有豐富飛行資源的飛行員，我的訓練與資源取得相對容易，但睿哲面臨的是完全不同的挑戰。作為台灣飛行員，他需要來回往返台美進行訓練，這樣的困難並非每個人能克服。然而，睿哲依然懷抱熱情，勇敢地將夢想付諸行動，準備駕駛飛機環繞地球，我全力支持他的勇氣與決心，誠摯邀請大家一起為他加油！" },
    { name: "趙式隆", title: "臺灣矽谷創業家協會創會理事長", quote: "飛行，是人類對未知的探索與對極限的挑戰。我的摯弟弟，不僅是一位熱愛飛行的夢想家，更是一位勇敢的行動者。他正在籌備一場意義非凡的環球飛行計畫，希望透過這次旅程，不僅實踐自己的飛行夢想，更向世界傳遞勇氣、創新與無限可能的精神。我誠摯邀請大家，一起成為趙旅程的推手，讓睿哲的環球飛行計畫飛得更高、更遠，讓世界看見台灣的夢想與實力！" },
    { name: "亞倫．馬修斯 (Aaron Matthews)", title: "認證飛行與認證儀器飛行教官", quote: "作為Roger Lin的飛行學校同學，我親眼見證了他的飛行熱情與決心。他不僅勇敢起夢，還真正付諸行動，買下自己的飛機，準備自繞環球飛行，這真的是讓人佩服！Roger的夢想不只是個人冒險，而是對飛行精神的極致展現。他的旅程將激勵更多人勇敢追夢，突破界限。我誠摯呼籲大家支持他的募款計畫，無論是資助或擴散訊息，都將幫助他完成這場非凡的飛行壯舉！" },
    { name: "尚．德桑維爾 (Jean d' Assonville)", title: "飛機維修專家、飛行測試員", quote: "作為Roger的朋友和早期飛行教練，我深知他對飛行的熱情與堅持。如今，Roger準備挑戰自繞環球飛行，他的計劃將激發更多人對飛行的熱愛與追求，並為未來的航空探索鋪路。作為見證者，我相信他會成功實現這個夢想。我誠摯呼籲大家支持Roger的環球飛行募款計劃，無論是資金援助還是擴大影響力，您的支持將是他成功的重要助力。讓我們一起見證這段充滿挑戰與成就的旅程！" },
    { name: "馬特．利克奈茨基 (Matt Liknaitzky)", title: "美國飛機工廠總經理、飛行考官", quote: "作為一名熱愛航空的專業人士，我深知飛行的魅力與其挑戰，這條的冒險，將不僅僅航空文化的發展，更能激勵無數年輕人追求自己的飛行夢想。航空是我生命的一部分，而Roger的計劃將為我們展示飛行的無窮可能。無論是資金支持還是擴大影響力，您每一份支持，都是對航空未來的投資。讓我們一同支持這個激動人心的環球飛行計劃，共同見證Roger突破自我，實現夢想的旅程！" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-cyan-400">N688TW</div>
          <div className="flex gap-6 text-sm">
            <a href="#mission" className="hover:text-cyan-400 transition">任務</a>
            <a href="#route" className="hover:text-cyan-400 transition">路線</a>
            <a href="#story" className="hover:text-cyan-400 transition">故事</a>
            <a href="#support" className="hover:text-cyan-400 transition">支持</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden min-h-screen flex items-center justify-center" style={{
        backgroundImage: 'url(/images/mainpics.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
            N688TW
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">林睿哲的自駕環球飛行</h2>
          <p className="text-xl text-gray-300 mb-8">
            純台籍飛行員 · 史上首位環球飛行
          </p>
          <p className="text-lg text-cyan-300 mb-12">
            THE FIRST EVER PILOT OF PURE TAIWANESE NATIONALITY TO FLY AROUND THE WORLD
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-black p-4 rounded-lg border border-cyan-500/30">
              <div className="text-2xl font-bold text-cyan-400">25,125</div>
              <div className="text-sm text-gray-400">海裡總航程</div>
            </div>
            <div className="bg-black p-4 rounded-lg border border-cyan-500/30">
              <div className="text-2xl font-bold text-cyan-400">180</div>
              <div className="text-sm text-gray-400">預計飛行時數</div>
            </div>
            <div className="bg-black p-4 rounded-lg border border-cyan-500/30">
              <div className="text-2xl font-bold text-cyan-400">15</div>
              <div className="text-sm text-gray-400">主要航點</div>
            </div>
            <div className="bg-black p-4 rounded-lg border border-cyan-500/30">
              <div className="text-2xl font-bold text-cyan-400">10+</div>
              <div className="text-sm text-gray-400">國家</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Roger Lin */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">關於林睿哲</h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">身份與角色</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>WINGTIPS飛行夢想誌主編</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>行政院青能獎入圍</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>教育部青年諮詢委員</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>新北市政府優秀青年代表</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">教育背景</h3>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>國立台灣大學管理學院碩士</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▸</span>
                  <span>國立台灣大學昆蟲學系學士</span>
                </li>
              </ul>
              
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">飛行資格</h3>
              <p className="text-gray-300 text-sm">
                FAA飛行員執照及儀表飛行資格，飛行經驗包括：EA500噴射機、Sling 2、PA-28、C172、DA-40、DA-42、PL-1（介壽號教練機）、CJ-6（中共初教六教練機）等。
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-8 rounded-lg border border-cyan-500/30">
            <p className="text-lg text-gray-200 leading-relaxed">
              "我是林睿哲，準備挑戰自駕單引擎飛機環球飛行。這不只是夢想，更是一次讓世界看見台灣的機會！"
            </p>
          </div>
        </div>
      </section>

      {/* Flight Route Map Section */}
      <section id="route" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">環球飛行路線</h2>
          
          {/* Map Placeholder */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg border border-cyan-500/30 overflow-hidden mb-12">
            <img src="/images/flight_route_map.png" alt="Flight Route Map" className="w-full h-auto" />
          </div>

          {/* Flight Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Gauge className="w-6 h-6 text-cyan-400" />
                <h3 className="font-bold">飛機詳情</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><span className="text-cyan-400">REG:</span> N688TW</li>
                <li><span className="text-cyan-400">機型:</span> SLING 4 TSi</li>
                <li><span className="text-cyan-400">機長:</span> Roger Lin</li>
                <li><span className="text-cyan-400">工程師:</span> Filipe Rosa</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-cyan-400" />
                <h3 className="font-bold">飛行統計</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><span className="text-cyan-400">總航程:</span> 25,125 nm</li>
                <li><span className="text-cyan-400">飛行時數:</span> ~180 小時</li>
                <li><span className="text-cyan-400">航點數:</span> 15 個</li>
                <li><span className="text-cyan-400">國家數:</span> 10+</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-lg border border-cyan-500/30">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-6 h-6 text-cyan-400" />
                <h3 className="font-bold">主要航點</h3>
              </div>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>KEMT → PADK → RJCC → RCSS</li>
                <li>RPVM → WPDL → WMKJ → VTSS</li>
                <li>VNPR → OMFJ → OJAM → LKLN</li>
                <li>BIRK → CYYR → KEMT</li>
              </ul>
            </div>
          </div>

          {/* Where Am I - Live Tracking */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">我在哪裡</h3>
            <div dangerouslySetInnerHTML={{
              __html: '<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="100%" height="600" src="https://www.airnavradar.com/data/registration/N688TW?zoom=3"></iframe>'
            }} />
          </div>
        </div>
      </section>

      {/* Sponsors & Contributors Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">贊助與貢獻者</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-black p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32">
              <img src="/images/JC_Wings_logo.jpg" alt="JC Wings" className="max-w-full max-h-24 object-contain" />
            </div>
            <div className="bg-black p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32">
              <img src="/images/toontec-solutions.jpg" alt="Toontec Solutions" className="max-w-full max-h-24 object-contain" />
            </div>
            <div className="bg-black p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32">
              <img src="/images/ALB-MODELS_LOGO.jpg" alt="ALB-MODELS" className="max-w-full max-h-24 object-contain" />
            </div>
            <div className="bg-black p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32">
              <img src="/images/images.png" alt="Sponsor" className="max-w-full max-h-24 object-contain" />
            </div>
            <div className="bg-black p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32">
              <img src="/images/unnamed(2).png" alt="Contributor" className="max-w-full max-h-24 object-contain" />
            </div>
            <div className="bg-black p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32">
              <img src="/images/unnamed(3).png" alt="Contributor" className="max-w-full max-h-24 object-contain" />
            </div>
            <div className="bg-black p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32">
              <img src="/images/unnamed(4).png" alt="Contributor" className="max-w-full max-h-24 object-contain" />
            </div>
            <div className="bg-white p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32">
              <img src="/images/unnamed(1).png" alt="WINGTIPS" className="max-w-full max-h-24 object-contain" />
            </div>
            <div className="bg-black p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32">
              <img src="/images/sponsors_1.png" alt="Contributor" className="max-w-full max-h-24 object-contain" />
            </div>
            <div className="bg-black p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32">
              <img src="/images/sponsors_2.png" alt="Contributor" className="max-w-full max-h-24 object-contain" />
            </div>
            <div className="bg-black p-6 rounded-lg border border-cyan-500/30 flex items-center justify-center min-h-32">
              <img src="/images/WhatsAppImage2026-05-01at15.31.42.jpeg" alt="Supporter" className="max-w-full max-h-24 object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Facebook Live Feed */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">實時動態</h2>
          
          {/* Social Media Feed - Static Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Facebook Card */}
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-cyan-500/30 p-8 hover:border-cyan-500/50 transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <Facebook className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-lg">Facebook 最新動態</div>
                  <div className="text-xs text-cyan-400">飛行員林睿哲的自駕環球飛行</div>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed mb-6 text-gray-300">
                跟隨 N688TW 環球飛行的最新動態。了解飛行程進、紅人故事和對世界的探索。
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 text-lg flex-shrink-0">✈</span>
                  <div>
                    <div className="font-semibold text-sm">飛行程進更新</div>
                    <div className="text-xs text-gray-400">實時分享每一段旅程</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 text-lg flex-shrink-0">📸</span>
                  <div>
                    <div className="font-semibold text-sm">照片與故事</div>
                    <div className="text-xs text-gray-400">世界各地的精彩時刻</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 text-lg flex-shrink-0">💬</span>
                  <div>
                    <div className="font-semibold text-sm">社群互動</div>
                    <div className="text-xs text-gray-400">與粉絲們互動交流</div>
                  </div>
                </div>
              </div>
              
              <a 
                href="https://www.facebook.com/p/飛行員林睿哲的自駕環球飛行-Pilot-Rogers-Around-the-World-Flight-61574042008429/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
              >
                前往 Facebook →
              </a>
            </div>
            
            {/* Threads/Instagram Card */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-cyan-500/30 p-8 hover:border-cyan-500/50 transition">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">@</span>
                </div>
                <div>
                  <div className="font-bold text-lg">Threads 最新動態</div>
                  <div className="text-xs text-cyan-400">@rogerworldflight</div>
                </div>
              </div>
              
              <p className="text-sm leading-relaxed mb-6 text-gray-300">
                在 Threads 上跟隨我們的每一步。分享飛行的時刻、世界的美景和不一樣的經歷。
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <span className="text-pink-400 text-lg flex-shrink-0">🌍</span>
                  <div>
                    <div className="font-semibold text-sm">全球視角</div>
                    <div className="text-xs text-gray-400">探索世界各地的風景</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pink-400 text-lg flex-shrink-0">💭</span>
                  <div>
                    <div className="font-semibold text-sm">飛行後記</div>
                    <div className="text-xs text-gray-400">分享飛行的感想與體驗</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-pink-400 text-lg flex-shrink-0">👥</span>
                  <div>
                    <div className="font-semibold text-sm">社群連結</div>
                    <div className="text-xs text-gray-400">與全球飛行愛好者互動</div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <a 
                  href="https://www.threads.com/@rogerworldflight" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50"
                >
                  Threads →
                </a>
                <a 
                  href="https://www.instagram.com/rogerworldflight/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-3 bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-500 hover:to-orange-400 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/50"
                >
                  Instagram →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">林睿哲的故事</h2>
          
          <div className="space-y-4">
            {/* Story 1 */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30 overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === "story1" ? null : "story1")}
                className="w-full p-6 flex items-center justify-between hover:bg-cyan-500/5 transition"
              >
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-cyan-400">夢想啟點：1990年代的種子</h3>
                  <p className="text-gray-400 mt-2">五歲的悸動，遊樂場的搖搖飛機</p>
                </div>
                <ChevronDown className={`w-6 h-6 text-cyan-400 transition ${expandedSection === "story1" ? "rotate-180" : ""}`} />
              </button>
              
              {expandedSection === "story1" && (
                <div className="px-6 pb-6 border-t border-cyan-500/20 text-gray-300 space-y-4">
                  <p>五歲那年，睿哲第一次對飛行產生興趣——不是在機場，而是在遊樂場的搖搖飛機上。當林睿哲坐上去的那一刻，感覺自己彷彿真的飛了起來，心中的悸動從此種下。林睿哲開始愛上家裡擺放的飛機模型，迷戀地撫摸著那些機身線條，對這些會飛的金屬巨鳥充滿無限想像。</p>
                  <p>隨著年紀漸長，林睿哲不只是喜歡看飛機，還想要深入了解它們。國小時，每年暑假的作業裡，林睿哲總會畫上一架架飛機，無論是軍機、民航機，甚至是自己幻想設計的飛機。林睿哲的筆記本上滿是飛機的速寫，而最讓林睿哲興奮的，是每當發現報章雜誌中出現航空新聞，林睿哲總會迫不及待地向家人、老師、同學介紹：「這架飛機的型號，巡航速度是多少，……」即使大家不一定聽得懂，林睿哲依然樂此不疲。</p>
                  <p>當其他孩子放學後沉迷於卡通或電動時，林睿哲則專注地閱讀飛行相關書籍。林睿哲不僅是個喜歡飛機的小男孩，更是個對飛行充滿熱情的探索者。</p>
                  <p>由於父母忙於工作，從小學開始，每逢寒暑假，林睿哲的父母便委託地勤人員帶著睿哲獨自搭飛機。對大多數孩子來說，獨自搭機或許會讓人緊張，但對林睿哲而言，這是一場期待已久的旅程。林睿哲總是選擇靠窗的座位，仔細觀察著機翼上各種機關的運作，感受飛機加速起飛的瞬間，心跳總是不自覺地加快。</p>
                  <p>每次飛行，林睿哲總會好奇地盯著駕駛艙的門，想像裡面是什麼樣的世界。終於某次落地後，林睿哲鼓起勇氣請求空服員帶自己參觀駕駛艙，機長微笑著點頭說道：「小弟弟，你好啊，我是機長！」，林睿哲的心中閃過一個念頭：「原來飛行員也是普通人，那麼，也許有一天，我也許能成為他們的一員。」</p>
                </div>
              )}
            </div>

            {/* Story 2 */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30 overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === "story2" ? null : "story2")}
                className="w-full p-6 flex items-center justify-between hover:bg-cyan-500/5 transition"
              >
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-cyan-400">挫折與轉身：夢想的另一種守護</h3>
                  <p className="text-gray-400 mt-2">從文字到天空，夢想再次啟航</p>
                </div>
                <ChevronDown className={`w-6 h-6 text-cyan-400 transition ${expandedSection === "story2" ? "rotate-180" : ""}`} />
              </button>
              
              {expandedSection === "story2" && (
                <div className="px-6 pb-6 border-t border-cyan-500/20 text-gray-300 space-y-4">
                  <p>國中畢業後，林睿哲懷著滿腔熱血，走向空軍官校的招募攤位，想要報名成為飛行學員。然而，現實無情地澆熄了林睿哲的希望──視力未達標準（當時需要裸視1.0，且不接受雷射手術），無法成為軍機飛行員。家人也希望林睿哲專注於學業，於是，林睿哲暫時放下了飛行夢想。</p>
                  <p>然而，放下並不代表遺忘。即便不能親自駕駛飛機，林睿哲仍然不斷地向天空投去渴望的目光。放學後，林睿哲經常獨自騎腳踏車到機場附近，站在跑道頭，看著飛機轟鳴著衝向藍天，想像自己有一天也能坐在駕駛艙內，親手操控這些夢想之翼。</p>
                  <p>大學畢業後，林睿哲創辦了《Wingtips飛行夢想誌》，透過文字記錄航空故事，採訪國內外的航空業者，讓更多人認識飛行的美好。林睿哲以為，或許這樣就能彌補不能飛行的遺憾。然而，命運似乎不願讓林睿哲只停留在文字裡。一次偶然的機會，林睿哲參加了飛行學校的體驗飛行。當林睿哲握住操縱桿的那一刻，內心的悸動再次被點燃，林睿哲清楚地知道——這不僅是場體驗，而是條應該踏上的道路。</p>
                  <p>於是，林睿哲鼓起勇氣，隻身飛往美國，開始為期半年的飛行訓練。沒有親友在身旁，語言、文化、環境全都陌生，但林睿哲知道，這是通往夢想的必經之路。經過無數次的努力與挑戰，終於考取了人生中的第一張飛行執照。</p>
                </div>
              )}
            </div>

            {/* Story 3 */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30 overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === "story3" ? null : "story3")}
                className="w-full p-6 flex items-center justify-between hover:bg-cyan-500/5 transition"
              >
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-cyan-400">萬事俱備：專業與破釜沉舟</h3>
                  <p className="text-gray-400 mt-2">行動的必要條件，克服環球飛行的高門檻</p>
                </div>
                <ChevronDown className={`w-6 h-6 text-cyan-400 transition ${expandedSection === "story3" ? "rotate-180" : ""}`} />
              </button>
              
              {expandedSection === "story3" && (
                <div className="px-6 pb-6 border-t border-cyan-500/20 text-gray-300 space-y-6">
                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-3">環球飛行不只是夢，而是行動</h4>
                    <p>多年來，林睿哲一邊努力工作存錢，一邊回台大念碩士，一邊持續往返台灣、美國接受飛行訓練，陸續考取更多飛行相關檢定。即便疫情讓計畫延宕，林睿哲始終沒有放棄。經過多年努力，林睿哲終於逐一克服了自駕飛機環球所需的條件。</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-cyan-400 mb-3">克服環球飛行的高門檻</h4>
                    <div className="space-y-4">
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h5 className="font-bold text-cyan-300 mb-2">01 通過航空體檢</h5>
                        <p className="text-sm">飛行員須具備正常聽力、健康的心電圖、合格視力及標準BMI等條件。為保持最佳身體狀態，睿哲平時自律節制飲食並規律運動。目前，睿哲已獲美國聯邦航空局第一級（最高等級）飛行員體檢證。</p>
                      </div>
                      
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h5 className="font-bold text-cyan-300 mb-2">02 航空無線電能力</h5>
                        <p className="text-sm">熟練掌握航空無線電術語至關重要。因此，飛行執照背面特別加註 English Proficient 以證明語言能力。睿哲定期接受飛行訓練，確保語言水平達標，時刻保持最佳飛行狀態。</p>
                      </div>
                      
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h5 className="font-bold text-cyan-300 mb-2">03 擁有飛行執照與儀器飛行檢定證</h5>
                        <p className="text-sm">睿哲持有受國際普遍承認的美國聯邦航空局（FAA）飛行執照及儀器飛行檢定證照，符合在國際航路上執行長途飛行的資格。</p>
                      </div>
                      
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h5 className="font-bold text-cyan-300 mb-2">04 必須擁有自己的飛機</h5>
                        <p className="text-sm">環球的先決條件是必須擁有自己的飛機，對睿哲而言，這曾是遙不可及的夢。然而，憑藉多年工作的積蓄與貴人相助，最終成功購得一架適合環球的Sling Tsi輕型飛機，註冊於美國、機號N688TW。</p>
                      </div>
                      
                      <div className="bg-black/30 p-4 rounded-lg">
                        <h5 className="font-bold text-cyan-300 mb-2">05 良好的財務支持</h5>
                        <p className="text-sm">航油、維修、落地費等龐大開銷，讓無數飛行夢想止步於現實。然而，睿哲選擇不輕言放棄，來到這裡誠摯地尋求支持，盼望與您攜手，讓夢想真正起飛。</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Story 4 */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30 overflow-hidden">
              <button
                onClick={() => setExpandedSection(expandedSection === "story4" ? null : "story4")}
                className="w-full p-6 flex items-center justify-between hover:bg-cyan-500/5 transition"
              >
                <div className="text-left">
                  <h3 className="text-2xl font-bold text-cyan-400">終極使命：2026 挑戰環球</h3>
                  <p className="text-gray-400 mt-2">讓世界看見台灣，成就屬於台灣的自駕傳奇</p>
                </div>
                <ChevronDown className={`w-6 h-6 text-cyan-400 transition ${expandedSection === "story4" ? "rotate-180" : ""}`} />
              </button>
              
              {expandedSection === "story4" && (
                <div className="px-6 pb-6 border-t border-cyan-500/20 text-gray-300 space-y-4">
                  <p>這不僅是林睿哲的個人夢想，更是一次讓世界看見台灣的機會。駕駛單引擎飛機挑戰環球飛行，成就屬於台灣的自駕傳奇。</p>
                  <p>從美國出發，經過阿拉斯加、日本、台灣、東南亞、中東、歐洲，最後返回美國。這趟旅程將帶著台灣的夢想飛向世界各地。</p>
                  <p>這不僅是一場飛行冒險，更是一個關於堅持、勇氣和夢想的故事。N688TW，準備好了嗎？世界，看好了嗎？</p>
                  <p className="text-lg font-bold text-cyan-300 mt-6">激勵夢想 · 創造歷史 · 展現台灣</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Endorsements Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">各界聲援</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {endorsements.map((endorsement, index) => (
              <div key={index} className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6 rounded-lg border border-cyan-500/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex-shrink-0"></div>
                  <div>
                    <h4 className="font-bold text-cyan-300">{endorsement.name}</h4>
                    <p className="text-xs text-gray-400">{endorsement.title}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">"{endorsement.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="support" className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">追蹤我們的旅程</h2>
          <p className="text-xl text-gray-300 mb-12">
            加入我們，一起見證台灣飛行史上的壯舉
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition">
              訂閱更新
            </button>
            <button className="px-8 py-3 border border-cyan-500 text-cyan-400 font-bold rounded-lg hover:bg-cyan-500/10 transition">
              了解更多
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6">
            <a href="https://www.facebook.com/people/飛行員林睿哲的自駕環球飛行-Pilot-Rogers-Around-the-World-Flight/61574042008429/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition">
              <Facebook className="w-8 h-8" />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Instagram className="w-8 h-8" />
            </a>
            <a href="#" className="text-gray-400 hover:text-cyan-400 transition">
              <Youtube className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>

      {/* Sponsorship Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">支持環球飛行計畫</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* QR Code Section */}
            <div className="flex flex-col items-center">
              <div className="bg-white p-6 rounded-lg mb-6 shadow-lg">
                <img 
                  src="/images/linepay-qrcode.png" 
                  alt="Line Pay QR Code" 
                  className="w-64 h-64 object-contain"
                />
              </div>
              <p className="text-center text-sm text-gray-300 mb-4">掃描 QR Code 立即贊助</p>
            </div>
            
            {/* Sponsorship Info Section */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">👉 立即透過 Line Pay</h3>
                <p className="text-lg font-semibold mb-2">支持環球飛行計畫</p>
                <p className="text-sm text-gray-400 mb-4">（委託萊特兄弟公司收款）</p>
              </div>
              
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/30 p-6">
                <h4 className="font-bold text-cyan-400 mb-4">贊助步驟</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">1️⃣</span>
                    <span className="text-sm text-gray-300">輸入贊助金額＆完成付款</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-cyan-400 font-bold flex-shrink-0">2️⃣</span>
                    <span className="text-sm text-gray-300">付款完成後，請截圖交易畫面，並傳送至 Google 表單或電子郵件</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <a 
                  href="https://forms.gle/MFrkKHbc7NY5FtKR9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
                >
                  📋 提交 Google 表單
                </a>
                <a 
                  href="mailto:pilot.roger.lin@gmail.com" 
                  className="inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  ✉️ 發送至 pilot.roger.lin@gmail.com
                </a>
              </div>
              
              <p className="text-xs text-gray-400 border-t border-cyan-500/20 pt-4">
                備註：所有募資款項都由募資提案人林睿哲本人收款，款項將用於本計畫。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-cyan-500/20 bg-gradient-to-b from-transparent to-blue-500/5">
        <div className="max-w-4xl mx-auto text-center text-gray-400">
          <p className="mb-4">© 2026 N688TW Global Aviation Mission | 林睿哲的自駕環球飛行</p>
          <p className="text-sm">
            追蹤我們的旅程 | 
            <a href="https://www.facebook.com/people/飛行員林睿哲的自駕環球飛行-Pilot-Rogers-Around-the-World-Flight/61574042008429/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 mx-2">Facebook</a> |
            <a href="#" className="text-cyan-400 hover:text-cyan-300 mx-2">Instagram</a> |
            <a href="#" className="text-cyan-400 hover:text-cyan-300 mx-2">YouTube</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
