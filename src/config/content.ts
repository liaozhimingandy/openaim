/**
 * 站点全站文案与数据结构
 * ---------------------------------------------------------------
 * 首页所有可见文案都集中在这个文件里，改文案不需要改组件。
 * 带 TODO 标记的地方请替换成你们的真实信息（尤其是产品链接）。
 *
 * 文案基调：OpenAIM 目前处于起步阶段，不夸大进展、不编造数据，
 * 用「正在做什么 + 缺什么人」来吸引同路人。
 */
import type {Component} from 'vue'
import {
  BookIcon,
  ChartBubbleIcon,
  ChatIcon,
  CodeIcon,
  FolderIcon,
  LayersIcon,
  LaptopIcon,
  LockOnIcon,
  PenIcon,
  ServerIcon,
  SettingIcon,
  ToolsIcon,
  UsergroupIcon,
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
  slogan: '开放的通用大模型研究小组',
  email: 'contact@openaim.cn',
  /** TODO: 换成真实的 GitHub / 社区地址，留空则不展示相关入口 */
  githubUrl: '',
  description:
    'OpenAIM 是一个围绕通用大模型（AIM）的开放小组：读论文、跑实验、写工具，把研究过程公开出来，也把成果做成能用的产品。',
  /** 起步状态的一句话说明，首页多处引用 */
  stageNote: '2026 年起步 · 第一批成员招募中 · 全部过程公开',
}

/** 带主题的邮件链接（点击后自动填好主题） */
export const joinMailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  '想加入 OpenAIM，一起做大模型研究',
)}`

/** 首屏（Hero）文案 */
export const hero = {
  badge: siteConfig.stageNote,
  titlePrefix: '通用人工智能（AI）时代',
  titleHighlight: '已来临',
  lead:
    'OpenAIM 是一个刚开始组建的开放小组，围绕通用大模型（AIM）读论文、跑实验、写工具。我们现在人不多，进展也不快，所以不谈宏大叙事——只把正在做的事和缺的人写清楚。',
  points: [
    '研究和产品一起做：不止于论文，也把它做成能跑起来的东西',
    '过程全部公开：笔记、实验记录、踩过的坑都会写下来',
    '起步阶段：方向和节奏都还可以一起商量',
  ],
  primaryAction: '联系我们',
  secondaryAction: '看看我们在做什么',
}

/** 首屏右侧产品预览（示意图，非正式界面） */
export const heroPreview = {
  title: 'OpenAIM Chat',
  status: '示意图',
  messages: [
    {role: 'ai', text: '你好，我是 OpenAIM Assistant。可以帮你读论文、整理资料、写点代码。'},
    {role: 'user', text: '帮我把这篇论文的方法部分理一遍'},
    {role: 'ai', text: '先给出它要解决什么问题、用了什么方法，要不要展开讲实验设计？'},
  ],
  chips: ['文档问答', '论文精读', '代码助手'],
  placeholder: '问点什么，或者直接丢一篇论文给我…',
}

/** 我们在做什么 */
export const mission = {
  eyebrow: '我们在做什么',
  title: '和我们一起，用大语言模型造福人类',
  lead:
    '这是一件几个人做不完的事，所以从一开始就打算公开地做。现在的重点是三件：',
  items: [
    {
      icon: BookIcon,
      title: '把学习过程写出来',
      desc: '论文笔记、复现记录、踩坑总结都放到公开的知识库里，别人能顺着我们走过的路往下走。',
    },
    {
      icon: ToolsIcon,
      title: '做自己会用的工具',
      desc: '从数据处理到评测脚本，先把轮子做出来，能用比完美更重要。',
    },
    {
      icon: UsergroupIcon,
      title: '让更多人参与进来',
      desc: '把门槛尽量降低：任务拆细、文档写清楚，让有兴趣的人能真正上手而不是看热闹。',
    },
  ] satisfies MissionItem[],
}

/**
 * 产品展示
 * TODO: status / desc / highlights 请按真实进展修改，href 填入线上地址
 */
export const products: ProductItem[] = [
  {
    icon: BookIcon,
    name: 'OpenAIM Docs',
    tagline: '公开知识库',
    desc: '存放论文笔记、实践手册和踩坑记录，任何人都可以提交修改。这是目前优先级最高的一块。',
    status: '起步中',
    statusTheme: 'primary',
    highlights: ['论文笔记', '实践手册', '开放编辑'],
    href: '',
  },
  {
    icon: ChatIcon,
    name: 'OpenAIM Chat',
    tagline: '对话助手',
    desc: '面向问答、写作与代码场景的对话界面，支持切换不同的开源模型。目前还在搭基本功能。',
    status: '早期开发',
    statusTheme: 'warning',
    highlights: ['多模型接入', '上下文管理'],
    href: '',
  },
  {
    icon: CodeIcon,
    name: 'OpenAIM API',
    tagline: '统一推理接口',
    desc: '一套接口接入多个开源模型，带基础的限流和用量统计。现阶段只满足内部调用需求。',
    status: '规划中',
    statusTheme: 'danger',
    highlights: ['接口统一', '用量统计'],
    href: '',
  },
  {
    icon: ServerIcon,
    name: 'OpenAIM Studio',
    tagline: '训练与评测',
    desc: '数据准备、微调训练、效果评测放在一处，让实验可追溯。还在确定方案阶段。',
    status: '规划中',
    statusTheme: 'danger',
    highlights: ['实验记录', '结果对比'],
    href: '',
  },
]

/** 研究方向 */
export const research = {
  eyebrow: '研究方向',
  title: '我们打算从这几块入手',
  lead:
    '方向不贪多，先选了六个我们认为值得长期投入的点。每一块都缺人，也不要求你已经是专家——愿意长期投入一件事就够了。',
  items: [
    {
      icon: LayersIcon,
      title: '预训练与模型架构',
      desc: '跟进主流架构的演进，做小规模的验证性实验，理解它们为什么有效。',
    },
    {
      icon: SettingIcon,
      title: '微调与对齐',
      desc: 'LoRA / QLoRA 等低成本微调方法，以及指令数据与对齐流程的实践。',
    },
    {
      icon: ServerIcon,
      title: '推理与部署',
      desc: '量化、推理加速、服务化，目标是让有限的算力跑出更高的吞吐。',
    },
    {
      icon: ChartBubbleIcon,
      title: '多模态',
      desc: '文本之外的模态怎么接进来，以及跨模态检索与生成的基本功。',
    },
    {
      icon: FolderIcon,
      title: '数据与合成',
      desc: '语料清洗、去重与配比，以及用模型反过来生成训练数据的可行做法。',
    },
    {
      icon: LockOnIcon,
      title: '评测与安全',
      desc: '建立我们自己的评测流程，关注幻觉、稳定性这些实际使用中会遇到的问题。',
    },
  ] satisfies ResearchItem[],
}

/** 加入我们 */
export const join = {
  eyebrow: '加入我们',
  title: '我们需要同伴',
  lead:
    '没有编制也没有 KPI，只有想把事情做出来的人。下面是目前最缺的四类角色——如果你的专长不在其中，也同样欢迎自荐。',
  roles: [
    {
      icon: LaptopIcon,
      title: '算法与实验',
      desc: '读论文、设计实验、跑复现，把结论整理成别人能验证的笔记。',
      tags: ['PyTorch', '论文复现', '实验设计'],
    },
    {
      icon: CodeIcon,
      title: '工程开发',
      desc: '训练与推理管线、后端服务、接口封装，让想法能真正跑起来。',
      tags: ['Python', '推理部署', '后端'],
    },
    {
      icon: PenIcon,
      title: '前端与产品',
      desc: '把模型能力做成好用的界面，负责站点、控制台和交互细节。',
      tags: ['Vue', '交互设计'],
    },
    {
      icon: UsergroupIcon,
      title: '内容与协作',
      desc: '整理笔记、校对文档、翻译资料，让社区的新人能顺利上手。',
      tags: ['写作', '翻译', '整理'],
    },
  ] satisfies JoinRoleItem[],
  steps: [
    {
      title: '写封邮件',
      desc: '简单介绍一下你和感兴趣的方向，不用写得很正式。',
    },
    {
      title: '聊一次',
      desc: '我们拉个短会，说清楚能一起做什么、大概需要投入多少时间。',
    },
    {
      title: '认领一件事',
      desc: '从一个具体的小任务开始，产出会以文档或开源的形式公开。',
    },
  ],
  ctaTitle: '要不要一起来？',
  ctaDesc: '一两句话的自我介绍就够了，剩下的我们可以慢慢聊。',
  ctaPrimary: '发邮件联系我们',
  ctaSecondary: '看看研究方向',
}
