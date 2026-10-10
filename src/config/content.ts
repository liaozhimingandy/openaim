/**
 * 站点全站文案与数据结构
 * ---------------------------------------------------------------
 * 首页所有可见文案都集中在这个文件里，改文案不需要改组件。
 * 带 TODO 标记的地方请替换成你们的真实信息（尤其是产品链接）。
 *
 * 文案基调：OpenAIM 目前处于起步阶段，不夸大进展、不编造数据，
 * 用「正在做什么 + 缺什么人」来吸引同路人。
 *
 * 路线定位（贯穿全站的口径，改文案时请保持一致）：
 *   现在   —— 基于已有开源大模型做二次开发与产品化，先解决日常需求
 *   接下来 —— 积累微调经验，把语音、图像、多模态能力接进来
 *   以后   —— 团队与算力都够了再考虑自研基础模型，现在明确不碰
 */
import type {Component} from 'vue'
import {
  BookIcon,
  ChatIcon,
  CompassIcon,
  ImageIcon,
  LaptopIcon,
  LayersIcon,
  ServerIcon,
  SettingIcon,
  SoundIcon,
} from 'tdesign-icons-vue-next'

/** 顶部导航项 */
export interface NavItem {
  /** 唯一标识 */
  key: string
  /** 导航文案 */
  label: string
  /** 对应的区块 id */
  anchor: string
}

/** 我们的目标条目 */
export interface MissionItem {
  icon: Component
  title: string
  desc: string
}

/** 阶段路线条目 */
export interface RoadmapItem {
  /** 阶段标签：现在 / 接下来 / 以后 */
  phase: string
  title: string
  desc: string
}

/** 产品条目 */
export interface ProductItem {
  icon: Component
  name: string
  /** 一句话说明 */
  tagline: string
  desc: string
  /** 右上角的进度标签 */
  status: string
  /** 标签主题：primary / success / warning / danger */
  statusTheme: 'primary' | 'success' | 'warning' | 'danger'
  /** 能力点列表 */
  highlights: string[]
  /** 跳转链接，留空则不显示「前往」按钮 */
  href: string
}

/** 研究方向条目 */
export interface ResearchItem {
  icon: Component
  title: string
  desc: string
}

/** 招募角色 */
export interface JoinRoleItem {
  icon: Component
  title: string
  desc: string
  tags: string[]
}

/** 顶部导航（同时也是页脚「快速导航」的数据源） */
export const navItems: NavItem[] = [
  {key: 'home', label: '首页', anchor: 'home'},
  {key: 'mission', label: '我们在做什么', anchor: 'mission'},
  {key: 'products', label: '产品', anchor: 'products'},
  {key: 'research', label: '研究方向', anchor: 'research'},
  {key: 'join', label: '加入我们', anchor: 'join'},
]

/** 站点基础信息 */
export const siteConfig = {
  name: 'OpenAIM',
  /** 品牌副标题 */
  slogan: '开源大模型应用小组',
  email: 'contact@openaim.cn',
  /** TODO: 换成真实的 GitHub / 社区地址，留空则不展示相关入口 */
  githubUrl: '',
  description:
    'OpenAIM 是一个围绕开源大模型的开放小组：不做预训练，把力气花在二次开发、微调和产品化上，让语音、文本、图像与多模态能力真正走进日常。',
  /** 起步状态的一句话说明，首页多处引用 */
  stageNote: '2026 年起步 · 第一批成员招募中 · 全部过程公开',
}

/** 带主题的邮件链接（点击后自动填好主题） */
export const joinMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  '想加入 OpenAIM，一起做开源大模型应用',
)}`

/** 首屏（Hero）文案 */
export const hero = {
  badge: siteConfig.stageNote,
  titlePrefix: '开源大模型已经够好，',
  titleHighlight: '缺的是把它用起来的人',
  lead:
    '预训练一次动辄几百万，现阶段我们不做。OpenAIM 选择站在开源模型的肩上：做二次开发、做微调、做产品，把语音、文本、图像和多模态能力变成解决日常问题的工具。我们现在人不多，进展也不快，所以只把正在做的事和缺的人写清楚。',
  points: [
    '先应用、后基础：模型用开源的，力气花在场景和体验上',
    '四类模型都碰：语音、文本、图像、多模态，挑真实需求做',
    '过程全部公开：方案、微调记录、踩过的坑都会写下来',
  ],
  primaryAction: '联系我们',
  secondaryAction: '看看我们在做什么',
}

/** 首屏右侧产品预览（示意图，非正式界面） */
export const heroPreview = {
  title: 'OpenAIM Chat',
  status: '示意图',
  messages: [
    {role: 'ai', text: '你好，我是 OpenAIM Assistant。可以听你说、看你的图，也能帮你写点东西。'},
    {role: 'user', text: '把这段会议录音整理成一页纪要'},
    {role: 'ai', text: '已经转写完了，按「结论 / 待办 / 责任人」排好，要导出吗？'},
  ],
  chips: ['语音转写', '图片识表', '文档问答'],
  placeholder: '说说你想解决什么问题…',
}

/** 我们在做什么 */
export const mission = {
  eyebrow: '我们在做什么',
  title: '把开源大模型，做成能解决日常问题的东西',
  lead:
    '自研基础模型的训练成本太高，不是现阶段该碰的事。我们选另一条路：用好已经开源的模型，做二次开发和微调，让它真正落地到生活里。',
  items: [
    {
      icon: LaptopIcon,
      title: '做能用的应用',
      desc: '不做完 Demo 就结束。选一个具体的日常场景，做成真的能天天用的东西，再慢慢打磨。',
    },
    {
      icon: SettingIcon,
      title: '围绕场景做微调',
      desc: '通用模型不够贴合时，用 LoRA 这类低成本方案做领域适配，效果和算力成本一起记下来。',
    },
    {
      icon: BookIcon,
      title: '过程全部公开',
      desc: '方案、数据、微调记录、踩坑总结都写进公开知识库，别人能顺着我们走过的路往下走。',
    },
  ] satisfies MissionItem[],
  /** 阶段路线：先应用化，最后才谈基础模型 */
  roadmap: [
    {
      phase: '现在',
      title: '应用化',
      desc: '基于现有开源模型做二次开发，先把一个日常场景完整跑通。',
    },
    {
      phase: '接下来',
      title: '微调与多模态',
      desc: '积累数据与微调经验，把语音、图像、多模态能力接进应用。',
    },
    {
      phase: '以后',
      title: '基础模型',
      desc: '等团队和算力都够了再考虑自研。现在明确不做，也不画这个饼。',
    },
  ] satisfies RoadmapItem[],
}

/** 产品区标题文案 */
export const productsIntro = {
  eyebrow: '我们的产品',
  title: '四类模型，从最日常的需求做起',
  lead:
    '每一款对应一类模型能力，也都还在很早的阶段：能跑起来的先上线，跑不动的就先写着。全部欢迎参与共建。',
}

/**
 * 产品展示
 * TODO: status / desc / highlights 请按真实进展修改，href 填入线上地址
 */
export const products: ProductItem[] = [
  {
    icon: ChatIcon,
    name: 'OpenAIM Chat',
    tagline: '文本 · 日常对话助手',
    desc: '面向写作、问答、整理资料这些日常场景的对话界面，底层可以切换不同的开源文本模型。',
    status: '早期开发',
    statusTheme: 'warning',
    highlights: ['多模型切换', '长文档问答'],
    href: '',
  },
  {
    icon: SoundIcon,
    name: 'OpenAIM Voice',
    tagline: '语音 · 听得懂也能说',
    desc: '语音识别加语音合成，做会议纪要、语音输入、口语陪练这类离不开耳朵和嘴的场景。',
    status: '规划中',
    statusTheme: 'danger',
    highlights: ['语音转写', '语音合成'],
    href: '',
  },
  {
    icon: ImageIcon,
    name: 'OpenAIM Vision',
    tagline: '图像 · 看得懂也会画',
    desc: '图片理解与生成：识别截图、表格和票据，也可以按一句描述生成配图。',
    status: '规划中',
    statusTheme: 'danger',
    highlights: ['图片理解', '图像生成'],
    href: '',
  },
  {
    icon: ServerIcon,
    name: 'OpenAIM Studio',
    tagline: '二次开发底座',
    desc: '模型接入、微调训练、效果评测放在一处。这是我们自己做应用的工具箱，也会开源出来。',
    status: '起步中',
    statusTheme: 'primary',
    highlights: ['模型接入', 'LoRA 微调', '效果评测'],
    href: '',
  },
]

/** 研究方向 */
export const research = {
  eyebrow: '研究方向',
  title: '围绕四类模型，我们打算从这几块入手',
  lead:
    '预训练暂时不碰，所以这里的「研究」更偏工程：怎么把已有的开源模型用得更好、更省、更贴场景。六个方向都缺人，也不要求你已经是专家——愿意长期投入一件事就够了。',
  items: [
    {
      icon: ChatIcon,
      title: '文本模型应用',
      desc: '对话、写作、知识问答与 Agent 编排，把通用能力接进具体的工作流里。',
    },
    {
      icon: SoundIcon,
      title: '语音模型',
      desc: '语音识别与合成的选型和串联，解决延迟、方言、嘈杂环境这些真会遇到的问题。',
    },
    {
      icon: ImageIcon,
      title: '图像模型',
      desc: '图片理解与生成，重点放在表格、票据、截图这类日常高频的场景上。',
    },
    {
      icon: LayersIcon,
      title: '多模态模型',
      desc: '图文音视频怎么融合到一起，以及跨模态检索与指令跟随的实际效果。',
    },
    {
      icon: SettingIcon,
      title: '微调与对齐',
      desc: 'LoRA / QLoRA 等低成本微调，加上指令数据构造与领域适配的完整流程。',
    },
    {
      icon: ServerIcon,
      title: '推理部署与成本',
      desc: '量化、加速、端侧部署，让有限的算力跑出能接受的体验和价格。',
    },
  ] satisfies ResearchItem[],
}

/** 加入我们 */
export const join = {
  eyebrow: '加入我们',
  title: '我们需要同伴',
  lead:
    '没有编制也没有 KPI，只有想把事情做出来的人。下面是目前最缺的四类角色——不需要你做过预训练，如果你的专长不在其中，也同样欢迎自荐。',
  roles: [
    {
      icon: LaptopIcon,
      title: '应用工程',
      desc: '前端和后端一起做：把模型能力包装成好用的界面、稳定的服务。',
      tags: ['Vue', 'Python', '后端'],
    },
    {
      icon: SettingIcon,
      title: '模型微调',
      desc: '整理数据、跑 LoRA 微调、做效果评测，把结论写成别人能复现的记录。',
      tags: ['LoRA', '数据清洗', '评测'],
    },
    {
      icon: LayersIcon,
      title: '语音 / 图像 / 多模态',
      desc: '负责语音、图像或多模态方向的选型、串联与落地实验，挑一个方向深耕。',
      tags: ['ASR / TTS', '图像生成', '多模态'],
    },
    {
      icon: CompassIcon,
      title: '场景与社区',
      desc: '挖掘真实需求、设计交互、整理文档，让新来的人能顺利上手。',
      tags: ['需求挖掘', '交互设计', '写作'],
    },
  ] satisfies JoinRoleItem[],
  steps: [
    {
      title: '写封邮件',
      desc: '简单介绍一下你和感兴趣的方向（语音 / 文本 / 图像 / 多模态都行），不用写得很正式。',
    },
    {
      title: '聊一次',
      desc: '我们拉个短会，说清楚能一起做什么、大概需要投入多少时间。',
    },
    {
      title: '认领一件事',
      desc: '从一个具体的小任务开始，产出会以文档或开源的形式公开出来。',
    },
  ],
  ctaTitle: '要不要一起来？',
  ctaDesc: '一两句话的自我介绍就够了，剩下的我们可以慢慢聊。',
  ctaPrimary: '发邮件联系我们',
  ctaSecondary: '看看研究方向',
}
