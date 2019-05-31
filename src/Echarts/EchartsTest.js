import React, { Component } from 'react';
import echarts from 'echartstree_daisy/lib/echarts';
import 'echartstree_daisy/lib/component/tooltip';
import 'echartstree_daisy/lib/chart/tree';
// import { Divider } from 'antd';
import { connect } from 'react-redux';


class EchartsTest extends Component {
    constructor(props) {
        super(props)
        this.initTree = this.initTree.bind(this);
        this.state = {
            temporaryArray: [],
            data1: [{
                "name": "数与代数",
                "knowledgeId": 1,
                "title": "数与代数",
                "key": 1,
                "mcHereShow": true,
                "children": [
                    {
                        "name": "数的认识",
                        "knowledgeId": 2,
                        "title": "数的认识",
                        "key": 2,
                        "mcHereShow": false,
                        "children": [
                            {
                                "name": "整数的认识（总）",
                                "knowledgeId": 3,
                                "title": "整数的认识（总）",
                                "key": 3,
                                "children": [
                                    {
                                        "name": "数9以内的数",
                                        "knowledgeId": 4,
                                        "title": "数9以内的数",
                                        "key": 4,
                                        "children": []
                                    },
                                    {
                                        "name": "认识1～5",
                                        "knowledgeId": 5,
                                        "title": "认识1～5",
                                        "key": 5,
                                        "children": []
                                    },
                                    {
                                        "name": "5以内数的合与分",
                                        "knowledgeId": 6,
                                        "title": "5以内数的合与分",
                                        "key": 6,
                                        "children": []
                                    },
                                    {
                                        "name": "数的排序",
                                        "knowledgeId": 7,
                                        "title": "数的排序",
                                        "key": 7,
                                        "children": []
                                    },
                                    {
                                        "name": "0的认识与意义",
                                        "knowledgeId": 8,
                                        "title": "0的认识与意义",
                                        "key": 8,
                                        "children": []
                                    },
                                    {
                                        "name": "认识6与7",
                                        "knowledgeId": 9,
                                        "title": "认识6与7",
                                        "key": 9,
                                        "children": []
                                    },
                                    {
                                        "name": "6、7的合与分",
                                        "knowledgeId": 10,
                                        "title": "6、7的合与分",
                                        "key": 10,
                                        "children": []
                                    },
                                    {
                                        "name": "认识8与9",
                                        "knowledgeId": 11,
                                        "title": "认识8与9",
                                        "key": 11,
                                        "children": []
                                    },
                                    {
                                        "name": "8、9的合与分",
                                        "knowledgeId": 12,
                                        "title": "8、9的合与分",
                                        "key": 12,
                                        "children": []
                                    },
                                    {
                                        "name": "认识10",
                                        "knowledgeId": 13,
                                        "title": "认识10",
                                        "key": 13,
                                        "children": []
                                    },
                                    {
                                        "name": "认识10",
                                        "knowledgeId": 14,
                                        "title": "认识10",
                                        "key": 14,
                                        "children": []
                                    },
                                    {
                                        "name": "认识计数单位“百”",
                                        "knowledgeId": 15,
                                        "title": "认识计数单位“百”",
                                        "key": 15,
                                        "children": []
                                    },
                                    {
                                        "name": "认识三位数",
                                        "knowledgeId": 16,
                                        "title": "认识三位数",
                                        "key": 16,
                                        "children": []
                                    },
                                    {
                                        "name": "认识计数单位“千”",
                                        "knowledgeId": 17,
                                        "title": "认识计数单位“千”",
                                        "key": 17,
                                        "children": []
                                    },
                                    {
                                        "name": "认识四位数",
                                        "knowledgeId": 18,
                                        "title": "认识四位数",
                                        "key": 18,
                                        "children": []
                                    },
                                    {
                                        "name": "数位",
                                        "knowledgeId": 19,
                                        "title": "数位",
                                        "key": 19,
                                        "children": []
                                    },
                                    {
                                        "name": "数与形结合的规律",
                                        "knowledgeId": 20,
                                        "title": "数与形结合的规律",
                                        "key": 20,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "整数的认识",
                                "knowledgeId": 21,
                                "title": "整数的认识",
                                "key": 21,
                                "children": []
                            },
                            {
                                "name": "奇数与偶数的初步认识",
                                "knowledgeId": 22,
                                "title": "奇数与偶数的初步认识",
                                "key": 22,
                                "children": []
                            },
                            {
                                "name": "2、3、5的倍数特征",
                                "knowledgeId": 23,
                                "title": "2、3、5的倍数特征",
                                "key": 23,
                                "children": []
                            },
                            {
                                "name": "十进制计数法",
                                "knowledgeId": 24,
                                "title": "十进制计数法",
                                "key": 24,
                                "children": []
                            },
                            {
                                "name": "倒数的认识",
                                "knowledgeId": 25,
                                "title": "倒数的认识",
                                "key": 25,
                                "children": []
                            },
                            {
                                "name": "整数的读法和写法",
                                "knowledgeId": 26,
                                "title": "整数的读法和写法",
                                "key": 26,
                                "children": []
                            },
                            {
                                "name": "整数的改写和近似数",
                                "knowledgeId": 27,
                                "title": "整数的改写和近似数",
                                "key": 27,
                                "children": []
                            },
                            {
                                "name": "整数大小的比较",
                                "knowledgeId": 28,
                                "title": "整数大小的比较",
                                "key": 28,
                                "children": []
                            },
                            {
                                "name": "分数的意义、读写及分类",
                                "knowledgeId": 29,
                                "title": "分数的意义、读写及分类",
                                "key": 29,
                                "children": []
                            },
                            {
                                "name": "整数、假分数和带分数的互化",
                                "knowledgeId": 30,
                                "title": "整数、假分数和带分数的互化",
                                "key": 30,
                                "children": []
                            },
                            {
                                "name": "分数大小的比较（总）",
                                "knowledgeId": 31,
                                "title": "分数大小的比较（总）",
                                "key": 31,
                                "children": [
                                    {
                                        "name": "同分母或同分子分数大小比较",
                                        "knowledgeId": 32,
                                        "title": "同分母或同分子分数大小比较",
                                        "key": 32,
                                        "children": []
                                    },
                                    {
                                        "name": "异分子分母分数的大小比较",
                                        "knowledgeId": 33,
                                        "title": "异分子分母分数的大小比较",
                                        "key": 33,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "小数点位置的移动与小数大小的变化规律（总）",
                                "knowledgeId": 34,
                                "title": "小数点位置的移动与小数大小的变化规律（总）",
                                "key": 34,
                                "children": [
                                    {
                                        "name": "小数的数位顺序",
                                        "knowledgeId": 35,
                                        "title": "小数的数位顺序",
                                        "key": 35,
                                        "children": []
                                    },
                                    {
                                        "name": "小数点向右移动",
                                        "knowledgeId": 36,
                                        "title": "小数点向右移动",
                                        "key": 36,
                                        "children": []
                                    },
                                    {
                                        "name": "小数点向左移动",
                                        "knowledgeId": 37,
                                        "title": "小数点向左移动",
                                        "key": 37,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "因数和倍数的意义（总）",
                                "knowledgeId": 38,
                                "title": "因数和倍数的意义（总）",
                                "key": 38,
                                "children": [
                                    {
                                        "name": "倍的认识",
                                        "knowledgeId": 39,
                                        "title": "倍的认识",
                                        "key": 39,
                                        "children": []
                                    },
                                    {
                                        "name": "倍的应用",
                                        "knowledgeId": 40,
                                        "title": "倍的应用",
                                        "key": 40,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "分数的意义、读写及分类（总）",
                                "knowledgeId": 41,
                                "title": "分数的意义、读写及分类（总）",
                                "key": 41,
                                "children": [
                                    {
                                        "name": "认识几分之一",
                                        "knowledgeId": 42,
                                        "title": "认识几分之一",
                                        "key": 42,
                                        "children": []
                                    },
                                    {
                                        "name": "认识几分之几",
                                        "knowledgeId": 43,
                                        "title": "认识几分之几",
                                        "key": 43,
                                        "children": []
                                    },
                                    {
                                        "name": "分数与除法的关系",
                                        "knowledgeId": 44,
                                        "title": "分数与除法的关系",
                                        "key": 44,
                                        "children": []
                                    },
                                    {
                                        "name": "一个数是另一个数的几分之几",
                                        "knowledgeId": 45,
                                        "title": "一个数是另一个数的几分之几",
                                        "key": 45,
                                        "children": []
                                    },
                                    {
                                        "name": "真分数与假分数",
                                        "knowledgeId": 46,
                                        "title": "真分数与假分数",
                                        "key": 46,
                                        "children": []
                                    },
                                    {
                                        "name": "带分数的读法",
                                        "knowledgeId": 47,
                                        "title": "带分数的读法",
                                        "key": 47,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "整数大小的比较（总）",
                                "knowledgeId": 48,
                                "title": "整数大小的比较（总）",
                                "key": 48,
                                "children": [
                                    {
                                        "name": "两位数的大小比较",
                                        "knowledgeId": 49,
                                        "title": "两位数的大小比较",
                                        "key": 49,
                                        "children": []
                                    },
                                    {
                                        "name": "三位数的大小与比较",
                                        "knowledgeId": 50,
                                        "title": "三位数的大小与比较",
                                        "key": 50,
                                        "children": []
                                    },
                                    {
                                        "name": "5以内数的大小比较",
                                        "knowledgeId": 51,
                                        "title": "5以内数的大小比较",
                                        "key": 51,
                                        "children": []
                                    },
                                    {
                                        "name": "大于、小于、等于的意义",
                                        "knowledgeId": 52,
                                        "title": "大于、小于、等于的意义",
                                        "key": 52,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "小数、分数和百分数之间的关系及其转化（总）",
                                "knowledgeId": 53,
                                "title": "小数、分数和百分数之间的关系及其转化（总）",
                                "key": 53,
                                "children": [
                                    {
                                        "name": "小数或分数化成百分数",
                                        "knowledgeId": 54,
                                        "title": "小数或分数化成百分数",
                                        "key": 54,
                                        "children": []
                                    },
                                    {
                                        "name": "百分数化成小数或分数",
                                        "knowledgeId": 55,
                                        "title": "百分数化成小数或分数",
                                        "key": 55,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "整数的读法和写法（总）",
                                "knowledgeId": 56,
                                "title": "整数的读法和写法（总）",
                                "key": 56,
                                "children": [
                                    {
                                        "name": "三位数的读写",
                                        "knowledgeId": 57,
                                        "title": "三位数的读写",
                                        "key": 57,
                                        "children": []
                                    },
                                    {
                                        "name": "四位数的读写",
                                        "knowledgeId": 58,
                                        "title": "四位数的读写",
                                        "key": 58,
                                        "children": []
                                    },
                                    {
                                        "name": "万以上数的读法",
                                        "knowledgeId": 59,
                                        "title": "万以上数的读法",
                                        "key": 59,
                                        "children": []
                                    },
                                    {
                                        "name": "万以上数的写法",
                                        "knowledgeId": 60,
                                        "title": "万以上数的写法",
                                        "key": 60,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "分数的基本性质",
                                "knowledgeId": 61,
                                "title": "分数的基本性质",
                                "key": 61,
                                "children": []
                            },
                            {
                                "name": "最简分数",
                                "knowledgeId": 62,
                                "title": "最简分数",
                                "key": 62,
                                "children": []
                            },
                            {
                                "name": "分数大小的比较",
                                "knowledgeId": 63,
                                "title": "分数大小的比较",
                                "key": 63,
                                "children": []
                            },
                            {
                                "name": "约分和通分",
                                "knowledgeId": 64,
                                "title": "约分和通分",
                                "key": 64,
                                "children": []
                            },
                            {
                                "name": "小数的读写、意义及分类",
                                "knowledgeId": 65,
                                "title": "小数的读写、意义及分类",
                                "key": 65,
                                "children": []
                            },
                            {
                                "name": "小数的性质及改写",
                                "knowledgeId": 66,
                                "title": "小数的性质及改写",
                                "key": 66,
                                "children": []
                            },
                            {
                                "name": "小数点位置的移动与小数大小的变化规律",
                                "knowledgeId": 67,
                                "title": "小数点位置的移动与小数大小的变化规律",
                                "key": 67,
                                "children": []
                            },
                            {
                                "name": "近似数及其求法",
                                "knowledgeId": 68,
                                "title": "近似数及其求法",
                                "key": 68,
                                "children": []
                            },
                            {
                                "name": "小数大小的比较",
                                "knowledgeId": 69,
                                "title": "小数大小的比较",
                                "key": 69,
                                "children": []
                            },
                            {
                                "name": "小数与分数的互化",
                                "knowledgeId": 70,
                                "title": "小数与分数的互化",
                                "key": 70,
                                "children": []
                            },
                            {
                                "name": "百分数的意义、读写及应用",
                                "knowledgeId": 71,
                                "title": "百分数的意义、读写及应用",
                                "key": 71,
                                "children": []
                            },
                            {
                                "name": "小数、分数和百分数之间的关系及其转化",
                                "knowledgeId": 72,
                                "title": "小数、分数和百分数之间的关系及其转化",
                                "key": 72,
                                "children": []
                            },
                            {
                                "name": "小数、分数和百分数之间的关系及其转化",
                                "knowledgeId": 73,
                                "title": "小数、分数和百分数之间的关系及其转化",
                                "key": 73,
                                "children": []
                            },
                            {
                                "name": "数轴的认识",
                                "knowledgeId": 74,
                                "title": "数轴的认识",
                                "key": 74,
                                "children": []
                            },
                            {
                                "name": "负数的意义及其应用",
                                "knowledgeId": 75,
                                "title": "负数的意义及其应用",
                                "key": 75,
                                "children": []
                            },
                            {
                                "name": "正、负数大小的比较",
                                "knowledgeId": 76,
                                "title": "正、负数大小的比较",
                                "key": 76,
                                "children": []
                            },
                            {
                                "name": "正、负数的运算",
                                "knowledgeId": 77,
                                "title": "正、负数的运算",
                                "key": 77,
                                "children": []
                            },
                            {
                                "name": "自然数的认识",
                                "knowledgeId": 78,
                                "title": "自然数的认识",
                                "key": 78,
                                "children": []
                            },
                            {
                                "name": "因数和倍数的意义",
                                "knowledgeId": 79,
                                "title": "因数和倍数的意义",
                                "key": 79,
                                "children": []
                            },
                            {
                                "name": "找一个数的因数的方法",
                                "knowledgeId": 80,
                                "title": "找一个数的因数的方法",
                                "key": 80,
                                "children": []
                            },
                            {
                                "name": "找一个数的倍数的方法",
                                "knowledgeId": 81,
                                "title": "找一个数的倍数的方法",
                                "key": 81,
                                "children": []
                            },
                            {
                                "name": "公倍数和最小公倍数",
                                "knowledgeId": 82,
                                "title": "公倍数和最小公倍数",
                                "key": 82,
                                "children": []
                            },
                            {
                                "name": "因数、公因数和最大公因数",
                                "knowledgeId": 83,
                                "title": "因数、公因数和最大公因数",
                                "key": 83,
                                "children": []
                            },
                            {
                                "name": "求几个数的最大公因数的方法",
                                "knowledgeId": 84,
                                "title": "求几个数的最大公因数的方法",
                                "key": 84,
                                "children": []
                            },
                            {
                                "name": "求几个数的最小公倍数的方法",
                                "knowledgeId": 85,
                                "title": "求几个数的最小公倍数的方法",
                                "key": 85,
                                "children": []
                            },
                            {
                                "name": "合数与质数",
                                "knowledgeId": 86,
                                "title": "合数与质数",
                                "key": 86,
                                "children": []
                            },
                            {
                                "name": "合数分解质因数",
                                "knowledgeId": 87,
                                "title": "合数分解质因数",
                                "key": 87,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": "数的运算",
                        "knowledgeId": 88,
                        "title": "数的运算",
                        "key": 88,
                        "children": [
                            {
                                "name": "两三位数乘一位数不进位的计算",
                                "knowledgeId": 89,
                                "title": "两三位数乘一位数不进位的计算",
                                "key": 89,
                                "children": []
                            },
                            {
                                "name": "进位加法（总）",
                                "knowledgeId": 90,
                                "title": "进位加法（总）",
                                "key": 90,
                                "children": [
                                    {
                                        "name": "两位数的进位加法",
                                        "knowledgeId": 91,
                                        "title": "两位数的进位加法",
                                        "key": 91,
                                        "children": []
                                    },
                                    {
                                        "name": "三位数的进位加法",
                                        "knowledgeId": 92,
                                        "title": "三位数的进位加法",
                                        "key": 92,
                                        "children": []
                                    },
                                    {
                                        "name": "20以内进位加法",
                                        "knowledgeId": 93,
                                        "title": "20以内进位加法",
                                        "key": 93,
                                        "children": []
                                    },
                                    {
                                        "name": "大于20的进位加法",
                                        "knowledgeId": 94,
                                        "title": "大于20的进位加法",
                                        "key": 94,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "整数的加法和减法（总）",
                                "knowledgeId": 95,
                                "title": "整数的加法和减法（总）",
                                "key": 95,
                                "children": [
                                    {
                                        "name": "两位数加一位数",
                                        "knowledgeId": 96,
                                        "title": "两位数加一位数",
                                        "key": 96,
                                        "children": []
                                    },
                                    {
                                        "name": "整数连加、连减混合",
                                        "knowledgeId": 97,
                                        "title": "整数连加、连减混合",
                                        "key": 97,
                                        "children": []
                                    },
                                    {
                                        "name": "三个数的加减",
                                        "knowledgeId": 98,
                                        "title": "三个数的加减",
                                        "key": 98,
                                        "children": []
                                    },
                                    {
                                        "name": "10以内加减法",
                                        "knowledgeId": 99,
                                        "title": "10以内加减法",
                                        "key": 99,
                                        "children": []
                                    },
                                    {
                                        "name": "三位数的不进位加与不退位减",
                                        "knowledgeId": 100,
                                        "title": "三位数的不进位加与不退位减",
                                        "key": 100,
                                        "children": []
                                    },
                                    {
                                        "name": "两位数的不退位减法",
                                        "knowledgeId": 101,
                                        "title": "两位数的不退位减法",
                                        "key": 101,
                                        "children": []
                                    },
                                    {
                                        "name": "两位数的不进位加法",
                                        "knowledgeId": 102,
                                        "title": "两位数的不进位加法",
                                        "key": 102,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "表内乘法（总）",
                                "knowledgeId": 103,
                                "title": "表内乘法（总）",
                                "key": 103,
                                "children": [
                                    {
                                        "name": "表内乘法（总）",
                                        "knowledgeId": 104,
                                        "title": "表内乘法（总）",
                                        "key": 104,
                                        "children": []
                                    },
                                    {
                                        "name": "2的乘法口诀",
                                        "knowledgeId": 105,
                                        "title": "2的乘法口诀",
                                        "key": 105,
                                        "children": []
                                    },
                                    {
                                        "name": "3的乘法口诀",
                                        "knowledgeId": 106,
                                        "title": "3的乘法口诀",
                                        "key": 106,
                                        "children": []
                                    },
                                    {
                                        "name": "4的乘法口诀",
                                        "knowledgeId": 107,
                                        "title": "4的乘法口诀",
                                        "key": 107,
                                        "children": []
                                    },
                                    {
                                        "name": "5的乘法口诀",
                                        "knowledgeId": 108,
                                        "title": "5的乘法口诀",
                                        "key": 108,
                                        "children": []
                                    },
                                    {
                                        "name": "6的乘法口诀",
                                        "knowledgeId": 109,
                                        "title": "6的乘法口诀",
                                        "key": 109,
                                        "children": []
                                    },
                                    {
                                        "name": "7、8、9的乘法口诀",
                                        "knowledgeId": 110,
                                        "title": "7、8、9的乘法口诀",
                                        "key": 110,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "退位减法（总）",
                                "knowledgeId": 111,
                                "title": "退位减法（总）",
                                "key": 111,
                                "children": []
                            },
                            {
                                "name": "整十、整百数乘一位数",
                                "knowledgeId": 112,
                                "title": "整十、整百数乘一位数",
                                "key": 112,
                                "children": []
                            },
                            {
                                "name": "异分母分数加法和减法",
                                "knowledgeId": 113,
                                "title": "异分母分数加法和减法",
                                "key": 113,
                                "children": []
                            },
                            {
                                "name": "同分母分数加法和减法",
                                "knowledgeId": 114,
                                "title": "同分母分数加法和减法",
                                "key": 114,
                                "children": []
                            },
                            {
                                "name": "关于0的乘法",
                                "knowledgeId": 115,
                                "title": "关于0的乘法",
                                "key": 115,
                                "children": []
                            },
                            {
                                "name": "数四则混合运算（总）",
                                "knowledgeId": 116,
                                "title": "数四则混合运算（总）",
                                "key": 116,
                                "children": [
                                    {
                                        "name": "有小括号的混合运算",
                                        "knowledgeId": 117,
                                        "title": "有小括号的混合运算",
                                        "key": 117,
                                        "children": []
                                    },
                                    {
                                        "name": "中括号",
                                        "knowledgeId": 118,
                                        "title": "中括号",
                                        "key": 118,
                                        "children": []
                                    },
                                    {
                                        "name": "无小括号的混合运算",
                                        "knowledgeId": 119,
                                        "title": "无小括号的混合运算",
                                        "key": 119,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "整数的除法及应用（总）",
                                "knowledgeId": 120,
                                "title": "整数的除法及应用（总）",
                                "key": 120,
                                "children": [
                                    {
                                        "name": "三位数除以整十数",
                                        "knowledgeId": 121,
                                        "title": "三位数除以整十数",
                                        "key": 121,
                                        "children": [
                                            {
                                                "name": "三位数除以两位数",
                                                "knowledgeId": 124,
                                                "title": "三位数除以两位数",
                                                "key": 124,
                                                "children": []
                                            }
                                        ]
                                    },
                                    {
                                        "name": "平均分的含义",
                                        "knowledgeId": 122,
                                        "title": "平均分的含义",
                                        "key": 122,
                                        "children": []
                                    },
                                    {
                                        "name": "竖式计算",
                                        "knowledgeId": 123,
                                        "title": "竖式计算",
                                        "key": 123,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "整数的乘法及应用（总）",
                                "knowledgeId": 125,
                                "title": "整数的乘法及应用（总）",
                                "key": 125,
                                "children": [
                                    {
                                        "name": "两位数乘两位数",
                                        "knowledgeId": 126,
                                        "title": "两位数乘两位数",
                                        "key": 126,
                                        "children": []
                                    },
                                    {
                                        "name": "三位数乘两位数",
                                        "knowledgeId": 127,
                                        "title": "三位数乘两位数",
                                        "key": 127,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "分数乘法（总）",
                                "knowledgeId": 128,
                                "title": "分数乘法（总）",
                                "key": 128,
                                "children": [
                                    {
                                        "name": "分数与整数相乘",
                                        "knowledgeId": 129,
                                        "title": "分数与整数相乘",
                                        "key": 129,
                                        "children": []
                                    },
                                    {
                                        "name": "分数与分数相乘",
                                        "knowledgeId": 130,
                                        "title": "分数与分数相乘",
                                        "key": 130,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "小数除法（总）",
                                "knowledgeId": 131,
                                "title": "小数除法（总）",
                                "key": 131,
                                "children": [
                                    {
                                        "name": "小数除以整数",
                                        "knowledgeId": 132,
                                        "title": "小数除以整数",
                                        "key": 132,
                                        "children": []
                                    },
                                    {
                                        "name": "小数除以小数",
                                        "knowledgeId": 133,
                                        "title": "小数除以小数",
                                        "key": 133,
                                        "children": []
                                    },
                                    {
                                        "name": "整数除以小数",
                                        "knowledgeId": 134,
                                        "title": "整数除以小数",
                                        "key": 134,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "小数乘法（总）",
                                "knowledgeId": 135,
                                "title": "小数乘法（总）",
                                "key": 135,
                                "children": [
                                    {
                                        "name": "小数与整数相乘",
                                        "knowledgeId": 136,
                                        "title": "小数与整数相乘",
                                        "key": 136,
                                        "children": []
                                    },
                                    {
                                        "name": "小数与小数相乘",
                                        "knowledgeId": 137,
                                        "title": "小数与小数相乘",
                                        "key": 137,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "运算定律与简便运算（总）",
                                "knowledgeId": 138,
                                "title": "运算定律与简便运算（总）",
                                "key": 138,
                                "children": [
                                    {
                                        "name": "加法交换律",
                                        "knowledgeId": 139,
                                        "title": "加法交换律",
                                        "key": 139,
                                        "children": []
                                    },
                                    {
                                        "name": "乘法交换律",
                                        "knowledgeId": 140,
                                        "title": "乘法交换律",
                                        "key": 140,
                                        "children": []
                                    },
                                    {
                                        "name": "加法结合律",
                                        "knowledgeId": 141,
                                        "title": "加法结合律",
                                        "key": 141,
                                        "children": []
                                    },
                                    {
                                        "name": "乘法结合律",
                                        "knowledgeId": 142,
                                        "title": "乘法结合律",
                                        "key": 142,
                                        "children": []
                                    },
                                    {
                                        "name": "乘法分配律",
                                        "knowledgeId": 143,
                                        "title": "乘法分配律",
                                        "key": 143,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "两三位数乘一位数连续进位的计算（总）",
                                "knowledgeId": 144,
                                "title": "两三位数乘一位数连续进位的计算（总）",
                                "key": 144,
                                "children": [
                                    {
                                        "name": "两位数乘一位数连续进位的计算",
                                        "knowledgeId": 145,
                                        "title": "两位数乘一位数连续进位的计算",
                                        "key": 145,
                                        "children": []
                                    },
                                    {
                                        "name": "三位数乘一位数连续进位的计算",
                                        "knowledgeId": 146,
                                        "title": "三位数乘一位数连续进位的计算",
                                        "key": 146,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "整数的加法和减法",
                                "knowledgeId": 147,
                                "title": "整数的加法和减法",
                                "key": 147,
                                "children": []
                            },
                            {
                                "name": "进位加法",
                                "knowledgeId": 148,
                                "title": "进位加法",
                                "key": 148,
                                "children": []
                            },
                            {
                                "name": "退位减法",
                                "knowledgeId": 149,
                                "title": "退位减法",
                                "key": 149,
                                "children": []
                            },
                            {
                                "name": "退位减法",
                                "knowledgeId": 150,
                                "title": "退位减法",
                                "key": 150,
                                "children": []
                            },
                            {
                                "name": "两三位数乘一位数连续进位的计算",
                                "knowledgeId": 151,
                                "title": "两三位数乘一位数连续进位的计算",
                                "key": 151,
                                "children": []
                            },
                            {
                                "name": "两三位数乘一位数连乘计算",
                                "knowledgeId": 1658,
                                "title": "两三位数乘一位数连乘计算",
                                "key": 1658,
                                "children": []
                            },
                            {
                                "name": "两三位数乘一位数的实际应用",
                                "knowledgeId": 1659,
                                "title": "两三位数乘一位数的实际应用",
                                "key": 1659,
                                "children": []
                            },
                            {
                                "name": "两三位数乘一位数一次进位的计算",
                                "knowledgeId": 1660,
                                "title": "两三位数乘一位数一次进位的计算",
                                "key": 1660,
                                "children": []
                            },
                            {
                                "name": "整数的加法和减法",
                                "knowledgeId": 1661,
                                "title": "整数的加法和减法",
                                "key": 1661,
                                "children": []
                            },
                            {
                                "name": "进位加法",
                                "knowledgeId": 1662,
                                "title": "进位加法",
                                "key": 1662,
                                "children": []
                            },
                            {
                                "name": "退位减法",
                                "knowledgeId": 1663,
                                "title": "退位减法",
                                "key": 1663,
                                "children": []
                            },
                            {
                                "name": "加法和减法的关系",
                                "knowledgeId": 1664,
                                "title": "加法和减法的关系",
                                "key": 1664,
                                "children": []
                            },
                            {
                                "name": "整数的乘法及应用",
                                "knowledgeId": 1665,
                                "title": "整数的乘法及应用",
                                "key": 1665,
                                "children": []
                            },
                            {
                                "name": "表内乘法",
                                "knowledgeId": 1666,
                                "title": "表内乘法",
                                "key": 1666,
                                "children": []
                            },
                            {
                                "name": "整数的除法及应用",
                                "knowledgeId": 1667,
                                "title": "整数的除法及应用",
                                "key": 1667,
                                "children": []
                            },
                            {
                                "name": "表内除法",
                                "knowledgeId": 1668,
                                "title": "表内除法",
                                "key": 1668,
                                "children": []
                            },
                            {
                                "name": "有余数的除法",
                                "knowledgeId": 1669,
                                "title": "有余数的除法",
                                "key": 1669,
                                "children": []
                            },
                            {
                                "name": "乘与除的互逆关系",
                                "knowledgeId": 1670,
                                "title": "乘与除的互逆关系",
                                "key": 1670,
                                "children": []
                            },
                            {
                                "name": "整数四则混合运算",
                                "knowledgeId": 1671,
                                "title": "整数四则混合运算",
                                "key": 1671,
                                "children": []
                            },
                            {
                                "name": "数的估算",
                                "knowledgeId": 1672,
                                "title": "数的估算",
                                "key": 1672,
                                "children": []
                            },
                            {
                                "name": "运算定律与简便运算",
                                "knowledgeId": 1673,
                                "title": "运算定律与简便运算",
                                "key": 1673,
                                "children": []
                            },
                            {
                                "name": "分数的加法和减法",
                                "knowledgeId": 1674,
                                "title": "分数的加法和减法",
                                "key": 1674,
                                "children": []
                            },
                            {
                                "name": "分数乘法",
                                "knowledgeId": 1675,
                                "title": "分数乘法",
                                "key": 1675,
                                "children": []
                            },
                            {
                                "name": "分数除法",
                                "knowledgeId": 1676,
                                "title": "分数除法",
                                "key": 1676,
                                "children": []
                            },
                            {
                                "name": "分数的简便计算",
                                "knowledgeId": 1677,
                                "title": "分数的简便计算",
                                "key": 1677,
                                "children": []
                            },
                            {
                                "name": "分数的四则混合运算",
                                "knowledgeId": 1678,
                                "title": "分数的四则混合运算",
                                "key": 1678,
                                "children": []
                            },
                            {
                                "name": "小数的加法和减法",
                                "knowledgeId": 1679,
                                "title": "小数的加法和减法",
                                "key": 1679,
                                "children": []
                            },
                            {
                                "name": "小数乘法",
                                "knowledgeId": 1680,
                                "title": "小数乘法",
                                "key": 1680,
                                "children": []
                            },
                            {
                                "name": "小数除法",
                                "knowledgeId": 1681,
                                "title": "小数除法",
                                "key": 1681,
                                "children": []
                            },
                            {
                                "name": "小数四则混合运算",
                                "knowledgeId": 1682,
                                "title": "小数四则混合运算",
                                "key": 1682,
                                "children": []
                            },
                            {
                                "name": "百分数的加减乘除运算",
                                "knowledgeId": 1683,
                                "title": "百分数的加减乘除运算",
                                "key": 1683,
                                "children": []
                            },
                            {
                                "name": "整数、分数、小数、百分数四则混合运算",
                                "knowledgeId": 1684,
                                "title": "整数、分数、小数、百分数四则混合运算",
                                "key": 1684,
                                "children": []
                            },
                            {
                                "name": "整除的性质及应用",
                                "knowledgeId": 1685,
                                "title": "整除的性质及应用",
                                "key": 1685,
                                "children": []
                            },
                            {
                                "name": "计算器与复杂的运算",
                                "knowledgeId": 1686,
                                "title": "计算器与复杂的运算",
                                "key": 1686,
                                "children": []
                            },
                            {
                                "name": "有理数的乘方",
                                "knowledgeId": 1687,
                                "title": "有理数的乘方",
                                "key": 1687,
                                "children": []
                            },
                            {
                                "name": "积的变化规律",
                                "knowledgeId": 1688,
                                "title": "积的变化规律",
                                "key": 1688,
                                "children": []
                            },
                            {
                                "name": "商的变化规律",
                                "knowledgeId": 1689,
                                "title": "商的变化规律",
                                "key": 1689,
                                "children": []
                            },
                            {
                                "name": "单位“1”的认识及确定",
                                "knowledgeId": 1690,
                                "title": "单位“1”的认识及确定",
                                "key": 1690,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": "式与方程",
                        "knowledgeId": 158,
                        "title": "式与方程",
                        "key": 158,
                        "children": [
                            {
                                "name": "用字母表示数",
                                "knowledgeId": 159,
                                "title": "用字母表示数",
                                "key": 159,
                                "children": []
                            },
                            {
                                "name": "含字母式子的求值",
                                "knowledgeId": 160,
                                "title": "含字母式子的求值",
                                "key": 160,
                                "children": []
                            },
                            {
                                "name": "等式的意义",
                                "knowledgeId": 161,
                                "title": "等式的意义",
                                "key": 161,
                                "children": []
                            },
                            {
                                "name": "方程的意义",
                                "knowledgeId": 162,
                                "title": "方程的意义",
                                "key": 162,
                                "children": []
                            },
                            {
                                "name": "方程与等式的关系",
                                "knowledgeId": 163,
                                "title": "方程与等式的关系",
                                "key": 163,
                                "children": []
                            },
                            {
                                "name": "方程需要满足的条件",
                                "knowledgeId": 164,
                                "title": "方程需要满足的条件",
                                "key": 164,
                                "children": []
                            },
                            {
                                "name": "方程的解和解方程",
                                "knowledgeId": 165,
                                "title": "方程的解和解方程",
                                "key": 165,
                                "children": []
                            },
                            {
                                "name": "不等式的意义及解法",
                                "knowledgeId": 166,
                                "title": "不等式的意义及解法",
                                "key": 166,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": "比和比例",
                        "knowledgeId": 167,
                        "title": "比和比例",
                        "key": 167,
                        "children": [
                            {
                                "name": "比的意义",
                                "knowledgeId": 168,
                                "title": "比的意义",
                                "key": 168,
                                "children": []
                            },
                            {
                                "name": "比的读法、写法及各部分的名称",
                                "knowledgeId": 169,
                                "title": "比的读法、写法及各部分的名称",
                                "key": 169,
                                "children": []
                            },
                            {
                                "name": "比与分数、除法的关系",
                                "knowledgeId": 170,
                                "title": "比与分数、除法的关系",
                                "key": 170,
                                "children": []
                            },
                            {
                                "name": "比的性质",
                                "knowledgeId": 171,
                                "title": "比的性质",
                                "key": 171,
                                "children": []
                            },
                            {
                                "name": "求比值和化简比",
                                "knowledgeId": 172,
                                "title": "求比值和化简比",
                                "key": 172,
                                "children": []
                            },
                            {
                                "name": "比例的意义和基本性质",
                                "knowledgeId": 173,
                                "title": "比例的意义和基本性质",
                                "key": 173,
                                "children": []
                            },
                            {
                                "name": "正比例和反比例的意义",
                                "knowledgeId": 174,
                                "title": "正比例和反比例的意义",
                                "key": 174,
                                "children": []
                            },
                            {
                                "name": "解比例",
                                "knowledgeId": 175,
                                "title": "解比例",
                                "key": 175,
                                "children": []
                            },
                            {
                                "name": "比例的应用",
                                "knowledgeId": 176,
                                "title": "比例的应用",
                                "key": 176,
                                "children": []
                            },
                            {
                                "name": "比的应用",
                                "knowledgeId": 177,
                                "title": "比的应用",
                                "key": 177,
                                "children": []
                            },
                            {
                                "name": "辨识成正比例的量与成反比例的量",
                                "knowledgeId": 178,
                                "title": "辨识成正比例的量与成反比例的量",
                                "key": 178,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": "探索规律",
                        "knowledgeId": 179,
                        "title": "探索规律",
                        "key": 179,
                        "children": [
                            {
                                "name": "算术中的规律",
                                "knowledgeId": 180,
                                "title": "算术中的规律",
                                "key": 180,
                                "children": []
                            },
                            {
                                "name": "数列中的规律",
                                "knowledgeId": 181,
                                "title": "数列中的规律",
                                "key": 181,
                                "children": []
                            },
                            {
                                "name": "“式”的规律",
                                "knowledgeId": 182,
                                "title": "“式”的规律",
                                "key": 182,
                                "children": []
                            },
                            {
                                "name": "数与形结合的规律",
                                "knowledgeId": 183,
                                "title": "数与形结合的规律",
                                "key": 183,
                                "children": []
                            },
                            {
                                "name": "数表中的规律",
                                "knowledgeId": 184,
                                "title": "数表中的规律",
                                "key": 184,
                                "children": []
                            },
                            {
                                "name": "事物的间隔排列规律",
                                "knowledgeId": 185,
                                "title": "事物的间隔排列规律",
                                "key": 185,
                                "children": []
                            },
                            {
                                "name": "事物的简单搭配规律",
                                "knowledgeId": 186,
                                "title": "事物的简单搭配规律",
                                "key": 186,
                                "children": []
                            },
                            {
                                "name": "简单周期现象中的规律",
                                "knowledgeId": 187,
                                "title": "简单周期现象中的规律",
                                "key": 187,
                                "children": []
                            },
                            {
                                "name": "简单图形覆盖现象中的规律",
                                "knowledgeId": 188,
                                "title": "简单图形覆盖现象中的规律",
                                "key": 188,
                                "children": []
                            },
                            {
                                "name": "通过操作实验探索规律",
                                "knowledgeId": 189,
                                "title": "通过操作实验探索规律",
                                "key": 189,
                                "children": []
                            }
                        ]
                    },
                    {
                        "name": "常见的量",
                        "knowledgeId": 190,
                        "title": "常见的量",
                        "key": 190,
                        "children": [
                            {
                                "name": "质量的单位换算（总）",
                                "knowledgeId": 191,
                                "title": "质量的单位换算（总）",
                                "key": 191,
                                "children": [
                                    {
                                        "name": "1千克=1000克",
                                        "knowledgeId": 193,
                                        "title": "1千克=1000克",
                                        "key": 193,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "质量及质量的常用单位",
                                "knowledgeId": 194,
                                "title": "质量及质量的常用单位",
                                "key": 194,
                                "children": [
                                    {
                                        "name": "认识吨",
                                        "knowledgeId": 195,
                                        "title": "认识吨",
                                        "key": 195,
                                        "children": []
                                    },
                                    {
                                        "name": "认识克与千克",
                                        "knowledgeId": 196,
                                        "title": "认识克与千克",
                                        "key": 196,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "时、分、秒及其关系、单位换算与计算（总）",
                                "knowledgeId": 197,
                                "title": "时、分、秒及其关系、单位换算与计算（总）",
                                "key": 197,
                                "children": [
                                    {
                                        "name": "经过时间",
                                        "knowledgeId": 199,
                                        "title": "经过时间",
                                        "key": 199,
                                        "children": []
                                    },
                                    {
                                        "name": "认识秒",
                                        "knowledgeId": 200,
                                        "title": "认识秒",
                                        "key": 200,
                                        "children": []
                                    },
                                    {
                                        "name": "24时记时法与普通记时法",
                                        "knowledgeId": 201,
                                        "title": "24时记时法与普通记时法",
                                        "key": 201,
                                        "children": []
                                    },
                                    {
                                        "name": "认识钟面指针及时间读法",
                                        "knowledgeId": 202,
                                        "title": "认识钟面指针及时间读法",
                                        "key": 202,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "钟面时间",
                                "knowledgeId": 198,
                                "title": "钟面时间",
                                "key": 198,
                                "children": []
                            },
                            {
                                "name": "长度及长度的常用单位",
                                "knowledgeId": 203,
                                "title": "长度及长度的常用单位",
                                "key": 203,
                                "children": [
                                    {
                                        "name": "认识长度单位“厘米”",
                                        "knowledgeId": 204,
                                        "title": "认识长度单位“厘米”",
                                        "key": 204,
                                        "children": []
                                    },
                                    {
                                        "name": "认识长度单位“米”",
                                        "knowledgeId": 205,
                                        "title": "认识长度单位“米”",
                                        "key": 205,
                                        "children": []
                                    },
                                    {
                                        "name": "认识长度单位“毫米”与“分米",
                                        "knowledgeId": 206,
                                        "title": "认识长度单位“毫米”与“分米",
                                        "key": 206,
                                        "children": []
                                    },
                                    {
                                        "name": "认识长度单位“千米”",
                                        "knowledgeId": 207,
                                        "title": "认识长度单位“千米”",
                                        "key": 207,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "根据情景选择合适的计量单位",
                                "knowledgeId": 208,
                                "title": "根据情景选择合适的计量单位",
                                "key": 208,
                                "children": []
                            },
                            {
                                "name": "进率与换算",
                                "knowledgeId": 209,
                                "title": "进率与换算",
                                "key": 209,
                                "children": []
                            },
                            {
                                "name": "时、分、秒及其关系、单位换算与计算",
                                "knowledgeId": 210,
                                "title": "时、分、秒及其关系、单位换算与计算",
                                "key": 210,
                                "children": []
                            },
                            {
                                "name": "年、月、日及其关系、单位换算与计算",
                                "knowledgeId": 211,
                                "title": "年、月、日及其关系、单位换算与计算",
                                "key": 211,
                                "children": []
                            },
                            {
                                "name": "货币、人民币及其常用单位",
                                "knowledgeId": 212,
                                "title": "货币、人民币及其常用单位",
                                "key": 212,
                                "children": []
                            },
                            {
                                "name": "货币、人民币的单位换算",
                                "knowledgeId": 213,
                                "title": "货币、人民币的单位换算",
                                "key": 213,
                                "children": []
                            },
                            {
                                "name": "质量及质量的常用单位",
                                "knowledgeId": 214,
                                "title": "质量及质量的常用单位",
                                "key": 214,
                                "children": []
                            },
                            {
                                "name": "质量的单位换算",
                                "knowledgeId": 215,
                                "title": "质量的单位换算",
                                "key": 215,
                                "children": []
                            },
                            {
                                "name": "长度及长度的常用单位",
                                "knowledgeId": 216,
                                "title": "长度及长度的常用单位",
                                "key": 216,
                                "children": []
                            },
                            {
                                "name": "长度的单位换算",
                                "knowledgeId": 217,
                                "title": "长度的单位换算",
                                "key": 217,
                                "children": []
                            },
                            {
                                "name": "面积和面积单位",
                                "knowledgeId": 218,
                                "title": "面积和面积单位",
                                "key": 218,
                                "children": []
                            },
                            {
                                "name": "面积单位间的进率及单位换算",
                                "knowledgeId": 219,
                                "title": "面积单位间的进率及单位换算",
                                "key": 219,
                                "children": []
                            },
                            {
                                "name": "体积、容积及其单位",
                                "knowledgeId": 220,
                                "title": "体积、容积及其单位",
                                "key": 220,
                                "children": []
                            },
                            {
                                "name": "体积、容积进率及单位换算",
                                "knowledgeId": 221,
                                "title": "体积、容积进率及单位换算",
                                "key": 221,
                                "children": []
                            },
                            {
                                "name": "计量单位中单复名数的改写",
                                "knowledgeId": 222,
                                "title": "计量单位中单复名数的改写",
                                "key": 222,
                                "children": []
                            },
                            {
                                "name": "日期和时间的推算",
                                "knowledgeId": 223,
                                "title": "日期和时间的推算",
                                "key": 223,
                                "children": [
                                    {
                                        "name": "平行四边形的拼组",
                                        "knowledgeId": 235,
                                        "title": "平行四边形的拼组",
                                        "key": 235,
                                        "children": []
                                    },
                                    {
                                        "name": "四连方",
                                        "knowledgeId": 236,
                                        "title": "四连方",
                                        "key": 236,
                                        "children": []
                                    }
                                ]
                            },
                            {
                                "name": "计数单位",
                                "knowledgeId": 224,
                                "title": "计数单位",
                                "key": 224,
                                "children": []
                            },
                            {
                                "name": "平年、闰年的判断方法",
                                "knowledgeId": 225,
                                "title": "平年、闰年的判断方法",
                                "key": 225,
                                "children": []
                            }
                        ]
                    }
                ]
            }],
            data: [{
                "name": "七年级数学",
                "isExpand_add": true,
                "knowledge_id": '1',
                // 'symbol': 'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',    //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                // 'symbol': 'path://M854.4 800.9c0.2-0.3 0.5-0.6 0.7-0.9C920.6 722.1 960 621.7 960 512s-39.4-210.1-104.8-288c-0.2-0.3-0.5-0.5-0.7-0.8-1.1-1.3-2.1-2.5-3.2-3.7-0.4-0.5-0.8-0.9-1.2-1.4-1.4-1.6-2.7-3.1-4.1-4.7l-0.1-0.1c-1.5-1.7-3.1-3.4-4.6-5.1l-0.1-0.1c-3.2-3.4-6.4-6.8-9.7-10.1l-0.1-0.1-4.8-4.8-0.3-0.3c-1.5-1.5-3-2.9-4.5-4.3-0.5-0.5-1-1-1.6-1.5-1-1-2-1.9-3-2.8-0.3-0.3-0.7-0.6-1-1C736.4 109.2 629.5 64 512 64s-224.4 45.2-304.3 119.2c-0.3 0.3-0.7 0.6-1 1-1 0.9-2 1.9-3 2.9-0.5 0.5-1 1-1.6 1.5-1.5 1.4-3 2.9-4.5 4.3l-0.3 0.3-4.8 4.8-0.1 0.1c-3.3 3.3-6.5 6.7-9.7 10.1l-0.1 0.1c-1.6 1.7-3.1 3.4-4.6 5.1l-0.1 0.1c-1.4 1.5-2.8 3.1-4.1 4.7-0.4 0.5-0.8 0.9-1.2 1.4-1.1 1.2-2.1 2.5-3.2 3.7-0.2 0.3-0.5 0.5-0.7 0.8C103.4 301.9 64 402.3 64 512s39.4 210.1 104.8 288c0.2 0.3 0.5 0.6 0.7 0.9 1 1.2 2.1 2.5 3.1 3.7 0.4 0.5 0.8 0.9 1.2 1.4 1.4 1.6 2.7 3.1 4.1 4.7 0 0.1 0.1 0.1 0.1 0.2 1.5 1.7 3 3.4 4.6 5l0.1 0.1c3.2 3.4 6.4 6.8 9.6 10.1l0.1 0.1c1.6 1.6 3.1 3.2 4.7 4.7l0.3 0.3c3.3 3.3 6.7 6.5 10.1 9.6 80.1 74 187 119.2 304.5 119.2s224.4-45.2 304.3-119.2c3.4-3.1 6.7-6.3 10-9.6l0.3-0.3c1.6-1.6 3.2-3.1 4.7-4.7l0.1-0.1c3.3-3.3 6.5-6.7 9.6-10.1l0.1-0.1c1.5-1.7 3.1-3.3 4.6-5 0-0.1 0.1-0.1 0.1-0.2 1.4-1.5 2.8-3.1 4.1-4.7 0.4-0.5 0.8-0.9 1.2-1.4 1.2-1.3 2.3-2.5 3.3-3.7z m4.1-142.6c-13.8 32.6-32 62.8-54.2 90.2-24.9-21.5-52.2-40.3-81.5-55.9 11.6-46.9 18.8-98.4 20.7-152.6H887c-3 40.9-12.6 80.6-28.5 118.3zM887 484H743.5c-1.9-54.2-9.1-105.7-20.7-152.6 29.3-15.6 56.6-34.4 81.5-55.9 22.2 27.4 40.4 57.6 54.2 90.2C874.4 403.4 884 443.1 887 484zM658.3 165.5c39.7 16.8 75.8 40 107.6 69.2-18.5 15.8-38.4 29.7-59.4 41.8-15.7-45-35.8-84.1-59.2-115.4 3.7 1.4 7.4 2.9 11 4.4z m-90.6 700.6c-9.2 7.2-18.4 12.7-27.7 16.4V697c39.9 2.8 78.6 11.6 115.7 26.2-8.3 24.6-17.9 47.3-29 67.8-17.4 32.4-37.8 58.3-59 75.1z m59-633.1c11 20.6 20.7 43.3 29 67.8-37.1 14.6-75.8 23.4-115.7 26.2V141.6c9.2 3.7 18.5 9.1 27.7 16.4 21.2 16.7 41.6 42.6 59 75zM540 640.9V540h147.5c-1.6 44.2-7.1 87.1-16.3 127.8l-0.3 1.2c-41.1-15.6-85.1-25.3-130.9-28.1z m0-156.9V383.1c45.8-2.8 89.8-12.5 130.9-28.1l0.3 1.2c9.2 40.7 14.7 83.5 16.3 127.8H540z m-56 56v100.9c-45.8 2.8-89.8 12.5-130.9 28.1l-0.3-1.2c-9.2-40.7-14.7-83.5-16.3-127.8H484z m-147.5-56c1.6-44.2 7.1-87.1 16.3-127.8l0.3-1.2c41.1 15.6 85 25.3 130.9 28.1V484H336.5zM484 697v185.4c-9.2-3.7-18.5-9.1-27.7-16.4-21.2-16.7-41.7-42.7-59.1-75.1-11-20.6-20.7-43.3-29-67.8 37.2-14.6 75.9-23.3 115.8-26.1z m0-370c-39.9-2.8-78.6-11.6-115.7-26.2 8.3-24.6 17.9-47.3 29-67.8 17.4-32.4 37.8-58.4 59.1-75.1 9.2-7.2 18.4-12.7 27.7-16.4V327zM365.7 165.5c3.7-1.5 7.3-3 11-4.4-23.4 31.3-43.5 70.4-59.2 115.4-21-12-40.9-26-59.4-41.8 31.8-29.2 67.9-52.4 107.6-69.2zM165.5 365.7c13.8-32.6 32-62.8 54.2-90.2 24.9 21.5 52.2 40.3 81.5 55.9-11.6 46.9-18.8 98.4-20.7 152.6H137c3-40.9 12.6-80.6 28.5-118.3zM137 540h143.5c1.9 54.2 9.1 105.7 20.7 152.6-29.3 15.6-56.6 34.4-81.5 55.9-22.2-27.4-40.4-57.6-54.2-90.2C149.6 620.6 140 580.9 137 540z m228.7 318.5c-39.7-16.8-75.8-40-107.6-69.2 18.5-15.8 38.4-29.7 59.4-41.8 15.7 45 35.8 84.1 59.2 115.4-3.7-1.4-7.4-2.9-11-4.4z m292.6 0c-3.7 1.5-7.3 3-11 4.4 23.4-31.3 43.5-70.4 59.2-115.4 21 12 40.9 26 59.4 41.8-31.8 29.2-67.9 52.4-107.6 69.2z',
                // 'symbolSize':25,
                "children": [
                    {
                        "name": "有理数",
                        "knowledge_id": '11',
                        "isExpand_add": true,
                        "children": [
                            { "name": "正数和负数", "knowledge_id": '111', "children": [] },
                            { "name": "有理数的定义", "knowledge_id": '112', "children": [] },
                            { "name": "有理数的加减法", "knowledge_id": '113', "children": [] },
                            { "name": "有理数的乘除法", "knowledge_id": '114', "children": [] },
                            { "name": "有理数的乘方", "knowledge_id": '115', "children": [], },
                        ]
                    },
                    {
                        "name": "整式的运算",
                        "knowledge_id": '12',
                        "children": [
                            { "name": "整式", "knowledge_id": '121', "children": [] },
                            { "name": "整式的加减", "knowledge_id": '122', "children": [] },
                        ]
                    },
                    {
                        "name": "一元一次方程",
                        "knowledge_id": '13',
                        "children": [
                            { "name": "从算式到方程", "knowledge_id": '131', "children": [] },
                            { "name": "解一元一次方程", "knowledge_id": '132', "children": [] },
                            {
                                "name": "一元一次方程应用", "knowledge_id": '133', "children": [],
                                // itemStyle: {  borderColor: 'red' }
                            },
                        ]
                    }
                ]
            }]
        }
    }

    initTree() {
        Add_first_id(this.state.data)
        Add_other_id(this.state.data)
        var TestNodeOption = {

            //提示框组件
            tooltip: {
                show: true,
                trigger: 'item',//触发类型，默认：item
                triggerOn: 'mousemove',//提示框触发的条件，默认mousemove|click
            },
            //系列列表
            series: [
                {
                    type: 'tree',   //树形结构
                    name: 'tree',
                    data: this.state.data,
                    // data: this.state.knowledgedata,

                    top: '10%',
                    left: '20%',
                    bottom: '10%',
                    right: '30%',

                    itemStyle: {
                        normal: {
                            borderColor: '#2e8b57'
                            // borderColor: 'red'
                        }
                    },


                    label: {       //每个节点所对应的标签的样式
                        normal: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 15            //标签文字大小

                        }
                    },

                    leaves: {      //叶子节点的特殊配置
                        label: {
                            normal: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        }
                    },

                    expandAndCollapse: true,      
                    // initialTreeDepth: 1,
                    animationDuration: 550,      
                    animationDurationUpdate: 750  
                }
            ]
        }

        
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        //通过父组件传过来的值
        var ifAdd = this.props.eventsOption.ifAdd
        var ifDelete = this.props.eventsOption.ifDelete
        var newname = this.props.eventsOption.newname
        var selectedid = this.props.eventsOption.selectedid
        var selectedid_str = selectedid.toString(10)
        var selectedid_array = selectedid_str.split("_")//选中id分层保存在数组中


        // 绘制图表 第一次加载的数据为上面定义的TestNodeOption
        if (myChart.getOption() === undefined) {
            myChart.setOption(TestNodeOption);
        }
        //之后的加载均在已有的数据的基础之上
        else myChart.setOption(myChart.getOption())


        var TimeFn = null;   //用于兼容单双击的Timeout函数指针

        //选中节点并传出
        myChart.on("click", transIndex.bind(this));

        function transIndex(param) {
            clearTimeout(TimeFn);
            TimeFn = setTimeout(() => {
                let options = myChart.getOption();//获取已生成图形的Option param
                var nodesOption = options.series[0].data;//获得所有节点的数组
                Add_symbolSize(nodesOption, param)
                myChart.setOption(options);

                const { setEchartState } = this.props;
                setEchartState({
                    type: 'EchartsIndexName',
                    payload: {
                        index: param.dataIndex,
                        name: param.data.name,
                        id: param.data.id,
                    }
                })
            }, 300);
        };
        //选中节点变大
        function Add_symbolSize(data, param) {
            for (let n = 0; n < data.length; n++) {
                if (data[n].name === param.data.name) {
                    // console.log('选中！', data[n].name)
                    data[n].symbolSize = 15
                } else {
                    data[n].symbolSize = 7
                }
                if (data[n].children) {
                    var children_data = data[n].children
                    Add_symbolSize(children_data, param)
                }
            }
        }
        //双击缩放时重定义Tree的高度
        myChart.on("dblclick", ExpandAndCollapse.bind(this));
        function ExpandAndCollapse(param) {
            clearTimeout(TimeFn);
            var container = document.getElementById('main');
            var allNode = 0;
            var nodes = myChart._chartsViews[0]._data._graphicEls;

            for (var i = 0, count = nodes.length; i < count; i++) {
                var node = nodes[i];
                if (node === undefined)
                    continue;
                allNode++;
            }
            // var height = window.innerHeight;
            var height = 800;
            var currentHeight = 20 * allNode;
            var newHeight = Math.max(currentHeight, height);
            container.style.height = newHeight + 'px';
            myChart.resize();
        };

        //数据根节点添加id
        function Add_first_id(data) {
            for (let n = 0; n < data.length; n++) {
                data[n].id = String(n)
            }
        }
        //数据根节点以外的节点添加id
        function Add_other_id(data) {
            for (let n = 0; n < data.length; n++) {
                var create_id = data[n].id + '_'
                if (data[n].children) {
                    var children_data = data[n].children
                    for (let i = 0; i < children_data.length; i++) {
                        children_data[i].id = create_id + String(i)
                    }
                    Add_other_id(children_data)
                }
            }
        }
        //删除数据全部id
        function Delete_AllId(data) {
            for (let n = 0; n < data.length; n++) {
                delete data[n].id
                if (data[n].children) {
                    Delete_AllId(data[n].children)
                }
            }
        }
        if (ifDelete) {
            deleteNode();
            // console.log('echarts删除节点')
        }
        // 删除节点
        function deleteNode() {
            let options = myChart.getOption();//获取已生成图形的Option param
            var nodesOption = options.series[0].data;//获得所有节点的数组
            if (nodesOption) {
                var selectednode = nodesOption
                for (let i = 0; i < selectedid_array.length - 1; i++) {
                    var current_id = parseInt(selectedid_array[i])
                    selectednode = selectednode[current_id].children
                }
                let lastid = parseInt(selectedid_array[selectedid_array.length - 1])
                selectednode.splice(lastid, 1)
                //删除节点后，先删除数据全部id，再重新添加id
                Delete_AllId(nodesOption)
                Add_first_id(nodesOption)
                Add_other_id(nodesOption)
                myChart.setOption(options);
            }
        }


        if (ifAdd) {
            addNode();
        }

        // 添加节点
        function addNode() {
            let options = myChart.getOption();//获取已生成图形的Option param
            var nodesOption = options.series[0].data;//获得所有节点的数组

            //添加新节点的数据
            if (nodesOption) {
                var selectednode = nodesOption
                for (let i = 0; i < selectedid_array.length; i++) {
                    var current_id = parseInt(selectedid_array[i])
                    selectednode = selectednode[current_id].children
                }
                let newid_lastone = selectednode.length
                let newid = selectedid_str + "_" + newid_lastone.toString(10)
                let newnodeInfo = {
                    "name": newname,
                    "id": newid,
                    "children": [],
                }
                selectednode.push(newnodeInfo)
                myChart.setOption(options);
            }
        }
    }

    //设置初始节点大小
    Add_symbolSize_origin(data) {
        for (let n = 0; n < data.length; n++) {
            data[n].symbolSize = 7
            if (data[n].children) {
                var children_data = data[n].children
                this.Add_symbolSize_origin(children_data)
            }
        }
    }
    componentWillMount() {
        this.Add_symbolSize_origin(this.state.data)
    }
    render() {
        return (
            <div style={{ maxHeight: '800px', overflow: 'scroll', overflowX: 'hidden' }}>
                <div id="main" style={{ width: '100%', height: '550px' }}></div>
            </div>
        );
    }
    componentDidMount() {
        this.initTree()
    }
    componentDidUpdate() {
        this.initTree()
    }
    shouldComponentUpdate(nextProps, nextState) {
        //根据子页面已有的props信息和再次传过来的props信息进行判断，若相同
        //再判断子页面上一次的state与本次修改后的state是否相同，若也相同，则无需进行componentDidUpdate操作
        //只要有一个不同，则需要加载componentDidUpdate，即更新操作
        return (nextProps.eventsOption !== this.props.eventsOption || nextState.data.length !== this.state.data.length);
    }
}

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setEchartState: (state) => dispatch(state)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EchartsTest);