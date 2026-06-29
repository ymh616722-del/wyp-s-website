const PROVINCE_DATA = {
  'anhui': { name: '安徽', food: '臭鳜鱼、牛肉汤、黄山烧饼', spots: '黄山、宏村、九华山', time: '3-5月、9-11月', tips: '黄山天气多变，带好雨具' },
  'beijing': { name: '北京', food: '北京烤鸭、炸酱面、卤煮', spots: '故宫、长城、颐和园', time: '4-5月、9-10月', tips: '旺季提前预约故宫门票' },
  'chongqing': { name: '重庆', food: '火锅、小面、酸辣粉', spots: '洪崖洞、武隆天坑、磁器口', time: '3-5月、9-11月', tips: '山城多坡，穿舒适的鞋' },
  'fujian': { name: '福建', food: '沙县小吃、佛跳墙、海蛎煎', spots: '鼓浪屿、武夷山、土楼', time: '4-6月、9-11月', tips: '台风季（7-9月）注意天气' },
  'gansu': { name: '甘肃', food: '兰州牛肉面、酿皮、手抓羊肉', spots: '莫高窟、月牙泉、张掖丹霞', time: '5-10月', tips: '西北日晒强，做好防晒' },
  'guangdong': { name: '广东', food: '早茶、烧鹅、肠粉', spots: '广州塔、开平碉楼、丹霞山', time: '10-3月', tips: '夏天炎热潮湿，注意防暑' },
  'guangxi-zhuang': { name: '广西', food: '螺蛳粉、桂林米粉、啤酒鱼', spots: '桂林漓江、阳朔、龙脊梯田', time: '4-10月', tips: '漓江漂流建议提前预约' },
  'guizhou': { name: '贵州', food: '酸汤鱼、丝娃娃、花溪牛肉粉', spots: '黄果树瀑布、千户苗寨、梵净山', time: '3-10月', tips: '天无三日晴，备好雨具' },
  'hainan': { name: '海南', food: '文昌鸡、清补凉、海鲜', spots: '三亚亚龙湾、天涯海角、蜈支洲岛', time: '11-4月', tips: '夏季台风频繁，关注预警' },
  'hebei': { name: '河北', food: '驴肉火烧、坝上烤全羊、饸饹面', spots: '承德避暑山庄、秦皇岛、白洋淀', time: '5-10月', tips: '坝上草原早晚温差大' },
  'heilongjiang': { name: '黑龙江', food: '锅包肉、哈尔滨红肠、铁锅炖', spots: '冰雪大世界、漠河北极村、镜泊湖', time: '12-2月看雪、6-8月避暑', tips: '冬季极寒，保暖最重要' },
  'henan': { name: '河南', food: '胡辣汤、烩面、灌汤包', spots: '少林寺、龙门石窟、清明上河园', time: '4-5月、9-10月', tips: '洛阳4月赏牡丹最佳' },
  'hong-kong': { name: '香港', food: '菠萝油、云吞面、蛋挞', spots: '维多利亚港、太平山、迪士尼', time: '10-3月', tips: '去找黄雨萌', special: true },
  'hubei': { name: '湖北', food: '热干面、武昌鱼、豆皮', spots: '武当山、黄鹤楼、三峡大坝', time: '3-5月、9-11月', tips: '武汉夏天很热，火炉城市' },
  'hunan': { name: '湖南', food: '臭豆腐、剁椒鱼头、米粉', spots: '张家界、凤凰古城、岳麓山', time: '4-10月', tips: '湖南菜偏辣，备好肠胃药' },
  'jiangsu': { name: '江苏', food: '大闸蟹、鸭血粉丝汤、生煎包', spots: '苏州园林、南京中山陵、周庄', time: '3-5月、9-11月', tips: '梅雨季（6-7月）潮湿多雨' },
  'jiangxi': { name: '江西', food: '瓦罐汤、南昌拌粉、粉蒸肉', spots: '庐山、婺源、井冈山', time: '3-5月赏花、9-11月', tips: '婺源3月油菜花最美' },
  'jilin': { name: '吉林', food: '延边冷面、锅包肉、参鸡汤', spots: '长白山天池、雾凇岛、查干湖', time: '12-2月看雪、7-8月避暑', tips: '长白山天池能否看到看运气' },
  'liaoning': { name: '辽宁', food: '锅包肉、海鲜、鸡架', spots: '沈阳故宫、大连海滨、盘锦红海滩', time: '5-10月', tips: '9月去盘锦看红海滩最美' },
  'macau': { name: '澳门', food: '葡式蛋挞、猪扒包、水蟹粥', spots: '大三巴牌坊、威尼斯人、路环', time: '10-3月', tips: '赌场免费穿梭巴士很方便' },
  'nei-mongol': { name: '内蒙古', food: '手把肉、烤全羊、奶茶', spots: '呼伦贝尔草原、额济纳胡杨林、响沙湾', time: '6-9月草原、10月胡杨', tips: '草原蚊虫多，带好驱蚊液' },
  'ningxia-hui': { name: '宁夏', food: '手抓羊肉、羊杂碎、搓面', spots: '沙坡头、西夏王陵、沙湖', time: '5-10月', tips: '日照强烈，注意防晒补水' },
  'quinghai': { name: '青海', food: '青海酿皮、手抓羊肉、酸奶', spots: '青海湖、茶卡盐湖、塔尔寺', time: '6-8月', tips: '去找黄雨萌', special: true },
  'shaanxi': { name: '陕西', food: '肉夹馍、凉皮、羊肉泡馍', spots: '兵马俑、华山、大雁塔', time: '3-6月、9-11月', tips: '回民街小吃种类丰富' },
  'shandong': { name: '山东', food: '煎饼卷大葱、鲁菜、海鲜', spots: '泰山、青岛栈桥、曲阜三孔', time: '4-6月、9-10月', tips: '青岛啤酒节在8月' },
  'shanghai': { name: '上海', food: '生煎、小笼包、本帮菜', spots: '外滩、迪士尼、田子坊', time: '3-5月、9-11月', tips: '迪士尼工作日去人少' },
  'shanxi': { name: '山西', food: '刀削面、过油肉、莜面', spots: '平遥古城、云冈石窟、壶口瀑布', time: '5-10月', tips: '山西面食种类极多值得探索' },
  'sichuan': { name: '四川', food: '麻辣火锅、担担面、串串香', spots: '九寨沟、稻城亚丁、都江堰', time: '3-6月、9-11月', tips: '高原地区注意高反' },
  'tianjin': { name: '天津', food: '狗不理包子、煎饼果子、麻花', spots: '天津之眼、五大道、古文化街', time: '4-5月、9-10月', tips: '相声茶馆值得体验' },
  'taiwan': { name: '台湾', food: '卤肉饭、珍珠奶茶、牛肉面', spots: '日月潭、阿里山、九份老街', time: '3-5月、9-11月', tips: '需要办理入台证' },
  'xinjiang-uygur': { name: '新疆', food: '大盘鸡、烤羊肉串、拌面', spots: '喀纳斯、天山天池、独库公路', time: '6-10月', tips: '新疆很大，行程要留够时间' },
  'xizang': { name: '西藏', food: '藏面、酥油茶、糌粑', spots: '布达拉宫、纳木错、珠峰大本营', time: '5-10月', tips: '提前适应高原，备好红景天' },
  'yunnan': { name: '云南', food: '过桥米线、鲜花饼、汽锅鸡', spots: '大理洱海、丽江古城、西双版纳', time: '全年皆宜，3-4月最佳', tips: '紫外线很强，防晒霜必备' },
  'zhejiang': { name: '浙江', food: '东坡肉、西湖醋鱼、小笼包', spots: '西湖、乌镇、普陀山', time: '3-5月、9-11月', tips: '杭州西湖免门票' }
};

(function() {
  const container = document.getElementById('chinaMapContainer');
  const modal = document.getElementById('provinceModal');
  const modalClose = document.getElementById('provinceModalClose');
  if (!container) return;

  let provinceStatus = JSON.parse(localStorage.getItem('travelMapStatus') || '{}');
  let currentProvinceId = null;

  fetch('images/china-map.svg')
    .then(r => r.text())
    .then(svgText => {
      container.innerHTML = svgText;
      applyStatuses();
      container.querySelectorAll('path').forEach(path => {
        path.addEventListener('click', () => openProvince(path.id));
      });
    });

  function applyStatuses() {
    Object.entries(provinceStatus).forEach(([id, status]) => {
      const path = container.querySelector(`#${id}`);
      if (path) {
        path.classList.remove('wantgo', 'been');
        if (status) path.classList.add(status);
      }
    });
  }

  function openProvince(id) {
    const data = PROVINCE_DATA[id];
    if (!data) return;
    currentProvinceId = id;

    document.getElementById('provinceName').textContent = data.name;
    document.getElementById('provinceFood').textContent = data.food;
    document.getElementById('provinceSpots').textContent = data.spots;
    document.getElementById('provinceTime').textContent = data.time;
    document.getElementById('provinceTips').textContent = data.tips;

    const specialEl = document.getElementById('provinceSpecial');
    specialEl.textContent = data.special ? '✨ 去找黄雨萌 ✨' : '';

    modal.classList.add('active');
  }

  modalClose?.addEventListener('click', () => modal.classList.remove('active'));
  modal?.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.getElementById('btnWantGo')?.addEventListener('click', () => {
    if (!currentProvinceId) return;
    provinceStatus[currentProvinceId] = 'wantgo';
    save();
  });

  document.getElementById('btnBeen')?.addEventListener('click', () => {
    if (!currentProvinceId) return;
    provinceStatus[currentProvinceId] = 'been';
    save();
  });

  document.getElementById('btnClear')?.addEventListener('click', () => {
    if (!currentProvinceId) return;
    delete provinceStatus[currentProvinceId];
    save();
  });

  function save() {
    localStorage.setItem('travelMapStatus', JSON.stringify(provinceStatus));
    applyStatuses();
    const allPaths = container.querySelectorAll('path');
    allPaths.forEach(p => {
      if (!provinceStatus[p.id]) {
        p.classList.remove('wantgo', 'been');
      }
    });
    modal.classList.remove('active');
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') modal?.classList.remove('active');
  });
})();
