// ==UserScript==
// @name         BFA研究生选课助手
// @namespace     https://github.com/SalamanderEYE/BFA-YJS-Web
// @version      1.0.1
// @description   BFA研究生教育管理系统选课界面优化及自动选课
// @author       Salamander
// @match        *://202.205.127.146:8881/*
// @icon         data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAFQUlEQVRYR+2WW2wUVRjH/2d2t5dtVVpLgRaiSFsUiJAQLoIYYmJMNF4eMIFWREkEKwkaQY0PaMuDlxgimBiCkZAUhKA2BkqVNLVc5BrxFgWLF0RAUKJ0Q23pds75/mZmd7u73XvxgQcnmczuzJxvfuf/XRWusUNdYzxwgaoP8i4QryuDaWLghQA00dP9L+gVjXZL4cXT81RnNhspX8dZClgLYio1LOqwzdirBqlxRgyWd69TO1XNEd6pBB0U+CIQSYEigIIum5h9Yb76IR1U+TucZVnYCx2260AkBwpt3ga1xkNq/FHuh8EcxqiSAchRq+3sAnVvOqCKDfyWgtvjINIBhYBPqVuP0KbAmxOQAaAx7exj6lgyqJEbeL+lsMvdebx7QmqkuqdBR6EADG7IFYhE87k6NS8ZUMV7PADB7FyBRMM4QBthsDhnIAMRjYnnn4gP8FGbOMci9qeNl9QKfaLG7eMYrw+dFPizDOpwBhLGZtOFxZ5FsSpVbmIriPuGACTGYIqb9jWH+QoMGnIC0oS2aaPfqvmjXp127FRu5GTlw9fUULkCicG73WvVUheo4hj9xVdwkoLRDlTGLNOA2OIoBNFYf7He+7RjZ0wTt5GYnxA7kUBOlWUa/5C46fJb6tJApa46wDplsCU7IML0uy6D0bS1xmpLQRWVehtddQZnUgYgY7Cye41a42wqpnVQVe/DIRrMzKSQuDAhhcJQyPNbyC/yJi9+6YFOBfyoRoOSQUBA1R7OBHAIJrzLcHWOB4xRxwUSiCGuK88DqHIGgsGDXW+olkhiJDTXqg5ugaAuoZeF4USHgfrFcZerkDdfoXCYLwSTLE5SKCQ22gOvqXtiszQBqOYzVgpxkgZFg7NODCAOSDR+XIWKy32wLCtXIKHG5K5X1fdpgZyHVe18mQaNCUAD6kRjyFWnxBdtCVkqJAYbularpwZX+qTz0OhDLMzvdlUaE8m6kDqOu6LB7MRO8QgfFFROQKIREGJsoEEFsgJyXrplN2sheH8AKFadcJblD/Mgz+/J3EAHxZC2sSjQoJqS9cE0EyPV2E9xEBp3OFnmpncwGj8ex1Wl3vTdO7Gz09hovLRKNaYaXdKOsDe3coYSHKahcgM5fMIC/MM9gMS4Kl2tcdxt4wv24YW/Vqm96eaojDP12BY2ieZCEwzFj1NKCx2Y2JoTaiFBaBUQjT4a9EDjMonvTBA/aY3WSyvViWzG3oxAo1tY6TH8WV+RAkeZghst0Cjb9GMf+6Qj2MsTf/7tacNz6ko2H8z0TkYgx8C4PXxcgnzJ8uKU7pXm3057NmO5CmYy7jy/PPeBMq3yppt++/PhB3d2Z1qTFVAqI6ytLwnavbOMYAqF40Q4AiLFJPPoXI1UUFiqRH75/YI1YdKJD/uHDERA2U8+O9nnzIUb3z6uADrGArW1JQVWcZ0YLoDIDIp4KARFgPDV+R25R0GfaDO3bE/z0UwwCc01siC4dMUEnyUfUDgxbPw8RL4ywuuVyHSKFEQ/GP14EiAbRh4paf9oRzYwSYEcZbBsRSdFaqIfDSkQr0L0XnKF0CNG5pe2bd+VLUxyoPpnxtPydiJO9tyAIDznAR4uat36ZS4wyYGWP19NIz8OFQgibT3B3oUj2z6+mCtMSpdx2crjEHNbLi4DpQ9GGop2bHlTuVP50I6kac/6FVMJ7qZIWXzGxGbSQGYFRWSbp9+sLmzZ/OvQMKKrUtYhLllSBvgfNZC7xXCSEhklIgUQ9JDmDA2/gUhHgSevWW1d33W1IJH1V1UY/yuIWDv/A2VS9V9Bi1JJK3MF9QAAAABJRU5ErkJggg==
// @grant        none
// @run-at       document-end
// @license      GNU General Public License v3.0
// @supportURL   https://github.com/SalamanderEYE/BFA-YJS-Web/issues
// ==/UserScript==

(function() {
    'use strict';

    const hideOriginal = true; // 隐藏原始的查询模块，初始状态为开启
    const selectDelay = 10 * 1000; // 刷课间隔
    const semester = ''; // 学期

    // 定义课程信息结构体
    const courseStruct = {
        courseListId: 0,
        courseId: "",
        courseName: "",
        courseCredit: 0,
        coursePeriod: 0,
        alreadyCount: 0,
        leftCount: 0,
        studentChoose: false,
        teachingClassName: "",
        teacherName: "",
        classRoom: "",
        volume: 0,
        campusId: 0,
        classTimes: {
            Text: "",
            startWeek: 0,
            endWeek: 0,
            weekday: 0,
            startSection: 0,
            endSection: 0,
            confliction: false,
        },
        element: {
            courseRaw: "",
            courseId: "",
            courseName: "",
            courseCredit: "",
            coursePeriod: "",
            leftCount: "",
            studentChoose: "",
            teachingClassName: "",
            teacherName: "",
            classTimes: "",
            classRoom: "",
            volume: "",
            campus: "",
        }
    };

    // 定义课程信息结构体
    const selectCourseStruct = {
        courseName: "",
        teacherName: "",
        classRoom: "",
        campusId: 0,
        classTimes: {
            Text: "",
            startWeek: 0,
            endWeek: 0,
            weekday: 0,
            startSection: 0,
            endSection: 0,
        }

    };

    // 创建课程信息结构体组
    const courseInfo = [];
    const selectCourseInfo = [];

    // 创建筛选器信息结构体
    const filterStruct = {
        courseName: "",
        courseId: "",
        courseCredit: 0,
        coursePeriod: 0,
        studentChoose: 0,
        teacherName: "",
        campusId: 0,
    };

    // 创建空的三维数组
    const courseTableInfo = [];

    // 初始化三维数组
    for (var week = 0; week < 16; week++) {
        courseTableInfo[week] = [];
        for (var weekday = 0; weekday < 7; weekday++) {
            courseTableInfo[week][weekday] = [];
            for (var section = 0; section < 12; section++) {
                courseTableInfo[week][weekday][section] = {};
                courseTableInfo[week][weekday][section].avaliable = true;
            }
        }
    }

    const courseSelector = []; // 存储按钮元素和状态的数组
    var latestCourseInfo; // 存储通过捕获HTTP请求获取的最新原始课程数据

    const queryCurrentSelectRoundInfo_Url = '/api/elective/courseChoose/queryCurrentSelectRoundInfo';
    const queryCommonCourse_Url = '/api/elective/courseChoose/queryCommonCourse';
    const studentChoose_Url = '/api/elective/courseSelectionList/studentChoose';
    const queryResult_Url = `http://202.205.127.146:8881/api/elective/courseSelectionNameList/queryResult`;
    const selectStudentCourseNew_Url = `http://202.205.127.146:8881/api/arrange/StudentCourse/selectStudentCourseNew`;

    /*
    const queryCurrentSelectRoundInfo_Requests = captureRequestDetails(queryCurrentSelectRoundInfo_Url).getCapturedRequests(); // 获取选课轮次信息
    const queryCommonCourse_Requests = captureRequestDetails(queryCommonCourse_Url).getCapturedRequests(); // 获取选课列表信息
    const studentChoose_Requests = captureRequestDetails(studentChoose_Url).getCapturedRequests(); // 获取选课结果信息
    */

    // 初始化时调用函数来检查当前的网址
    PageUrlDetection();

    // 监听哈希变化，当页面网址变化时调用函数
    window.onhashchange = PageUrlDetection;

    function PageUrlDetection() {

        switch (window.location.hash) {
            case '#/secStudent/schemeManagement/subPage/choose/choose':
                console.log('学生网上选课界面');
                var body = '{\"semester\":\"' + semester + '\",\"operateType\":\"personal\"}';
                var courseTable;
                // 发送请求，获取课表信息
                sendRequest(selectStudentCourseNew_Url, body)
                    .then(result => {
                        courseTable = result.data.week;
                        console.log('课表数据：', courseTable);
                        getSelectCourseInfo(courseTable);
                        console.log('课表数据提取：', selectCourseInfo);
                        setCourseTable();
                        console.log('冲突时间课表：', courseTableInfo);
                    });
                // 发送请求，获取选课界面课程信息
                captureRequestDetails(queryCommonCourse_Url).waitForCapturedRequest().then((request) => {
                    latestCourseInfo = request.response.data.rows;
                    getCourseInfoByRequest(latestCourseInfo); // 提取课程信息
                    console.log('页面获取，课程信息：', courseInfo);
                });
                setTimeout(function() {
                    var originalQueryModule = document.getElementsByClassName('ant-form ant-form-horizontal');
                    hideElement(originalQueryModule, hideOriginal); // 隐藏原始查询框
                    insertFilterBlock(); // 插入筛选器模块
                    getCourseInfoElement(); // 获取课程信息元素
                    setConfliction(); // 检测课程时间冲突，并添加时间冲突提醒
                    insertCourseSelector(); // 插入选课按钮
                }, 500); // 延迟调用函数
                break;
        }
    }

    //---------------------发送HTTP请求----------------------
    function sendRequest(url, body) {
        const timestamp_Sec = Math.floor(Date.now() / 1000);
        const requestUrl = `${url}?_t=${timestamp_Sec}`;

        const headers = {
            "content-type": "application/json;charset=UTF-8",
        };

        return new Promise((resolve, reject) => {
            fetch(requestUrl, {
                    headers: headers,
                    body: body,
                    method: "POST",
                })
                .then(response => response.json())
                .then(data => {
                    //console.log('请求结果：', data);
                    resolve(data);
                })
                .catch(error => {
                    //console.log('请求出错：', error);
                    reject(error);
                });
        });
    }

    // 创建标签
    function createLabel(text, forAttribute) {
        var element = document.createElement('label');
        element.textContent = text;
        element.htmlFor = forAttribute;

        // 设置默认样式
        element.style.fontSize = '14px';
        element.style.color = 'black';
        element.style.marginLeft = '10px';

        return element;
    }

    // 创建输入框
    function createInput(id, type = 'text') {
        var element = document.createElement('input');
        element.id = id;
        element.type = type;

        // 设置样式
        element.style.border = 'none';
        element.style.outline = 'none';
        element.style.padding = '5px';
        element.style.borderRadius = '5px';
        element.style.boxSizing = 'border-box';
        element.style.border = '1px solid #ccc';
        element.style.backgroundColor = 'transparent';
        element.style.marginRight = '20px';

        // 设置不同类型输入框
        switch (type) {
            case 'text':
                break;
            case 'number':
                element.min = '0';
                element.max = '5';
                break;
        }

        return element;
    }

    // 创建按钮
    function createButton(text) {
        var element = document.createElement('button');
        element.textContent = text;

        element.style.fontSize = '14px';
        element.style.color = 'black';
        element.style.paddingLeft = '10px';
        element.style.paddingRight = '10px';
        element.style.marginLeft = '10px';
        element.style.marginRight = '10px';

        return element;
    }

    // 创建下拉选择框
    function createDropdownSelect(options) {
        // 创建 select 元素
        var element = document.createElement('select');

        // 遍历选项数组并创建选项
        options.forEach(function(option) {
            var optionElement = document.createElement('option');
            optionElement.value = option.value;
            optionElement.textContent = option.text;
            element.appendChild(optionElement);
        });

        // 设置样式
        element.style.fontSize = '14px';
        element.style.color = 'black';
        element.style.border = 'none';
        element.style.outline = 'none';
        element.style.padding = '5px';
        element.style.borderRadius = '5px';
        element.style.boxSizing = 'border-box';
        element.style.border = '1px solid #ccc';
        element.style.backgroundColor = 'transparent';
        element.style.marginRight = '20px';

        return element;
    }


    //------------------------筛选器模块设置-------------------------------
    function insertFilterBlock() {

        const filterInput = Object.assign({}, filterStruct);

        // 创建筛选器模块元素
        var filterBlockElement = document.createElement('div');
        filterBlockElement.classList.add('course-filter-block');
        filterBlockElement.style.border = '1px solid #ccc';
        filterBlockElement.style.borderRadius = '2px';
        filterBlockElement.style.padding = '10px';

        // 创建课程名称标签和输入框
        var courseNameLabel = createLabel('课程名称：', 'course-name');
        var courseNameInput = createInput('course-name');


        // 创建学分数标签和输入框
        var courseCreditLabel = createLabel('学分数：', 'course-credit');
        var courseCreditInput = createInput('course-credit', 'number');

        // 创建校区标签和下拉选择框
        var campusLabel = createLabel('校区：', 'course-campus');
        var options = [
            { value: 0, text: '全部' },
            { value: 1, text: '海淀' },
            { value: 2, text: '怀柔' }
        ];
        var campusSelect = createDropdownSelect(options);

        // 创建获取输入按钮
        var getButton = createButton('确 定');

        // 创建清空输入按钮
        var clearButton = createButton('重 置');

        // 创建选课按钮
        var courseChooser = {};
        courseChooser.element = createButton('自动选课');
        courseChooser.select = false;
        switchButtonStatus_CourseChoose(courseChooser);

        // 添加标签和输入框到筛选器模块元素
        filterBlockElement.appendChild(courseNameLabel);
        filterBlockElement.appendChild(courseNameInput);
        filterBlockElement.appendChild(courseCreditLabel);
        filterBlockElement.appendChild(courseCreditInput);
        filterBlockElement.appendChild(campusLabel);
        filterBlockElement.appendChild(campusSelect);
        filterBlockElement.appendChild(getButton);
        filterBlockElement.appendChild(clearButton);
        filterBlockElement.appendChild(courseChooser.element);

        // 通过类名找到目标元素
        const className = '.pages-sec-student-scheme-pages-choose-choose-common-choose-index-contentBox';
        var targetElement = document.querySelector(className);

        // 确保目标元素存在
        if (!targetElement) {
            console.error('目标元素不存在');
            return;
        }

        // 获取目标元素的第一个子元素
        var firstChild = targetElement.firstElementChild;

        // 在第一个子元素后插入筛选器模块元素
        targetElement.insertBefore(filterBlockElement, firstChild.nextSibling);

        // 点击确认按钮进行筛选
        getButton.addEventListener('click', function() {
            filterInput.courseName = courseNameInput.value;
            filterInput.courseCredit = Number(courseCreditInput.value);
            filterInput.campusId = Number(campusSelect.value);

            console.log('用户输入:', filterInput);

            for (var i = 0; i < courseInfo.length; i++) {
                var match = []; // 布尔类型的匹配结果数组
                match.push(courseInfo[i].courseName.includes(filterInput.courseName));
                match.push(courseInfo[i].courseCredit === filterInput.courseCredit || filterInput.courseCredit === 0);
                match.push(courseInfo[i].campusId === filterInput.campusId || filterInput.campusId === 0);

                // 判断所有匹配项是否都为 true
                var isMatch = match.every(function(result) {
                    return result === true;
                });

                if (isMatch) {
                    hideElement(courseInfo[i].element.courseRaw, false);
                } else {
                    hideElement(courseInfo[i].element.courseRaw);
                }
            }
        });

        // 点击清空按钮清空输入框
        clearButton.addEventListener('click', function() {
            courseNameInput.value = '';
            courseCreditInput.value = '';
            campusSelect.value = '0';

            for (var i = 0; i < courseInfo.length; i++) {
                hideElement(courseInfo[i].element.courseRaw, false);
            }
        });

        // 点击选课按钮进行自动选课
        courseChooser.element.addEventListener('click', function() {
            courseChooser.select = !courseChooser.select;
            switchButtonStatus_CourseChoose(courseChooser);
            if (courseChooser.select) {
                for (let i = 0; i < courseInfo.length; i++) {
                    if (courseSelector[i].select & courseSelector[i].selectable) {
                        // 定时执行自动选课
                        executeFunction();

                        function executeFunction() {
                            if (!courseChooser.select) {
                                console.log('退出自动选课：', courseInfo[i]);
                                clearInterval(intervalId); // 退出定时执行自动选课
                            } else {
                                // 延迟执行
                                setTimeout(() => {
                                    courseInfo[i].element.studentChoose.click();
                                    console.log('自动选课：', courseInfo[i]);
                                    var studentChoose_RequestsId = captureRequestDetails(studentChoose_Url, true);
                                    var queryCommonCourse_RequestsId = captureRequestDetails(queryCommonCourse_Url, true);

                                    (async () => {
                                        while (studentChoose_RequestsId.getCapturedRequestsOnce() === undefined || queryCommonCourse_RequestsId.getCapturedRequestsOnce() === undefined) {
                                            await new Promise((resolve) => setTimeout(resolve, 10)); // 等待10毫秒
                                        }

                                        // 请求已完成，执行你想要在请求成功后执行的代码
                                        console.log("请求已捕获，执行下面的代码");
                                        var studentChoose = studentChoose_RequestsId.getCapturedRequestsOnce();
                                        var queryCommonCourse = queryCommonCourse_RequestsId.getCapturedRequestsOnce();
                                        var latestCourseInfo = queryCommonCourse.response.data.rows;
                                        getCourseInfoByRequest(latestCourseInfo);

                                        console.log('studentChoose：', studentChoose);
                                        console.log('选课后捕获更新请求：', queryCommonCourse);

                                        var match = []; // 布尔类型的匹配结果数组
                                        // 退出定时执行自动选课的条件
                                        match.push(courseInfo[i].studentChoose === 1);
                                        match.push(studentChoose.response.data.includes('课程已超过最大门数限制'));

                                        // 判断是否有任一条件满足
                                        let isMatch = match.some(function(result) {
                                            return result === true;
                                        });

                                        if (isMatch) {
                                            console.log('退出自动选课：', courseInfo[i]);
                                            courseSelector[i].selectable = !courseInfo[i].studentChoose;
                                            courseSelector[i].select = false;
                                            switchButtonStatus_CourseSelector(courseSelector[i]);
                                            clearInterval(intervalId); // 退出定时执行自动选课
                                            if (courseInfo[i].studentChoose === 0) {
                                                var body = '{\"semester\":\"' + semester + '\",\"operateType\":\"personal\"}';
                                                var courseTable;
                                                // 发送请求，获取课表信息
                                                sendRequest(selectStudentCourseNew_Url, body)
                                                    .then(result => {
                                                        courseTable = result.data.week;
                                                        console.log('课表数据：', courseTable);
                                                        getSelectCourseInfo(courseTable);
                                                        console.log('课表数据提取：', selectCourseInfo);
                                                        setCourseTable();
                                                        console.log('冲突时间课表：', courseTableInfo);
                                                    })
                                            }
                                        } else {
                                            courseSelector[i].selectable = !courseInfo[i].studentChoose;
                                            switchButtonStatus_CourseSelector(courseSelector[i]);
                                        }
                                    })();
                                }, i * 10);
                            }
                        }
                        let intervalId = setInterval(function() {
                            executeFunction();
                        }, selectDelay);
                    }
                }
            }
        });
    }

    //----------------------创建选课按钮----------------------------
    function insertCourseSelector() {
        var elements = document.getElementsByClassName('ant-list-item');

        for (let i = 0; i < elements.length; i++) {
            (function(index) { // 使用立即执行函数捕获索引值
                var currentElement = elements[index];
                var thirdChild = currentElement.children[2];

                var newBlock = document.createElement('div');
                var buttonObj = {}; // 用于存储按钮元素和状态的对象
                buttonObj.id = index;
                buttonObj.element = createButton('- 待 选');
                newBlock.appendChild(buttonObj.element);

                // 初始状态
                buttonObj.selectable = !courseInfo[index].studentChoose;
                buttonObj.select = false;
                switchButtonStatus_CourseSelector(buttonObj);

                // 在第3个子元素后插入选课器元素
                currentElement.insertBefore(newBlock, thirdChild.nextSibling);

                // 添加点击事件处理程序
                buttonObj.element.addEventListener('click', function() {
                    // 切换状态
                    buttonObj.select = !buttonObj.select;

                    // 按钮状态设置
                    switchButtonStatus_CourseSelector(buttonObj);
                });

                // 将按钮对象存入数组
                courseSelector.push(buttonObj);
            })(i);
        }
        console.log('选课器：', courseSelector);
    }

    //----------待选课程按钮状态设置--------------
    function switchButtonStatus_CourseSelector(buttonObj) {
        if (buttonObj.selectable) {
            hideElement(buttonObj.element, false);
            if (buttonObj.select) {
                buttonObj.element.textContent = '- 待 选';
                buttonObj.element.classList.add('active');
                buttonObj.element.style.backgroundColor = 'transparent';
            } else {
                buttonObj.element.textContent = '+ 待 选';
                buttonObj.element.classList.remove('active');
                buttonObj.element.style.backgroundColor = '';
            }
        } else {
            hideElement(buttonObj.element);
        }
    }

    //----------自动选课按钮状态设置--------------
    function switchButtonStatus_CourseChoose(buttonObj) {
        if (buttonObj.select) {
            buttonObj.element.textContent = '停止选课';
            buttonObj.element.classList.add('active');
            buttonObj.element.style.backgroundColor = 'transparent';
        } else {
            buttonObj.element.textContent = '自动选课';
            buttonObj.element.classList.remove('active');
            buttonObj.element.style.backgroundColor = '';
        }
    }

    function captureRequestDetails(requestURLs, once = false) {
        let capturedRequests = []; // 用于存储请求内容的数组
        let capturedRequest;
        let isListening = true; // 增加一个标志变量，用于控制是否继续监听

        // 生成一个0到9999之间的随机数
        let randomNumber = Math.floor(Math.random() * 10000);
        // 如果生成的随机数不满足4位数的长度，则补零
        let captureId = randomNumber.toString().padStart(4, '0');

        const originalOpen = XMLHttpRequest.prototype.open;
        const originalSend = XMLHttpRequest.prototype.send;

        // 重写 XMLHttpRequest.prototype.open 方法
        XMLHttpRequest.prototype.open = function(method, url) {
            this._method = method; // 存储请求方法
            this._url = url; // 存储请求URL
            originalOpen.apply(this, arguments); // 调用原始的 open 方法
        };

        // 重写 XMLHttpRequest.prototype.send 方法
        XMLHttpRequest.prototype.send = function(data) {
            const originalOnLoad = this.onload;
            const xhr = this;

            this.onload = function() {
                // 将 requestURL 转换为数组形式，方便统一处理
                requestURLs = Array.isArray(requestURLs) ? requestURLs : [requestURLs];

                // 检查请求的URL是否匹配需要捕获的URL列表
                const matchedURL = requestURLs.find(requestURL => {
                    const urlWithoutParams = requestURL.split('?')[0]; // 去除查询参数
                    return xhr._url.startsWith(urlWithoutParams);
                });

                if (matchedURL && isListening) {
                    // 如果URL匹配，将请求的详细信息存储到 capturedRequests 数组中
                    capturedRequest = {
                        url: xhr._url,
                        method: xhr._method,
                        payload: data, // 存储请求负载
                        response: xhr.responseText
                    };
                    capturedRequests.push(capturedRequest);
                    // 将非格式化的文本数据解析为JSON对象
                    capturedRequest.payload = JSON.parse(capturedRequest.payload);
                    capturedRequest.response = JSON.parse(capturedRequest.response);
                    // 在捕获到请求后输出请求内容
                    //console.log(captureId, '已捕获的请求内容:', capturedRequest);

                    if (once) {
                        // 停止监听请求
                        isListening = false;
                        XMLHttpRequest.prototype.open = originalOpen;
                        XMLHttpRequest.prototype.send = originalSend;
                    }
                }

                if (originalOnLoad) {
                    originalOnLoad.apply(xhr, arguments);
                }
            };
            originalSend.apply(this, arguments); // 调用原始的 send 方法发送请求
        };

        // 返回一个Promise，当请求被捕获时进行resolve
        function waitForCapturedRequest() {
            return new Promise((resolve) => {
                const intervalId = setInterval(() => {
                    if (capturedRequest) {
                        clearInterval(intervalId);
                        resolve(capturedRequest);
                    }
                }, 10);
            });
        }

        // 返回已捕获的请求内容数组
        function getCapturedRequests() {
            return capturedRequests;
        }

        // 返回最近一次捕获的请求内容
        function getCapturedRequestsOnce() {
            return capturedRequest;
        }

        // 返回一个包含 getCapturedRequests 方法的对象
        return {
            getCapturedRequests: getCapturedRequests,
            getCapturedRequestsOnce: getCapturedRequestsOnce,
            waitForCapturedRequest: waitForCapturedRequest
        };
    }

    //------------------------提取已选课程信息-----------------------------------
    function getSelectCourseInfo(courseTable) {
        for (var weekday = 0; weekday < 7; weekday++) {
            for (var section = 0; section < 12; section++) {
                var timetableVosNum = courseTable[weekday].section[section].timetableVos.length;
                for (var i = 0; i < timetableVosNum; i++) {
                    var timetableCourseInfo = courseTable[weekday].section[section].timetableVos[i];
                    //创建课程信息结构体
                    var course = Object.assign({}, selectCourseStruct);
                    // 创建子结构体的新空对象
                    course.classTimes = {};
                    selectCourseInfo.push(course);
                    var n = selectCourseInfo.length - 1;

                    // 提取课程时间信息
                    selectCourseInfo[n].classTimes.weekday = Number(timetableCourseInfo.teachingScheduleWeekDay);
                    var timeNumbers = timetableCourseInfo.teachingScheduleWeek.match(/\d+/g);
                    selectCourseInfo[n].classTimes.startWeek = Number(timeNumbers[0]);
                    selectCourseInfo[n].classTimes.endWeek = Number(timeNumbers[timeNumbers.length - 1]);
                    timeNumbers = timetableCourseInfo.classNodeId.match(/\d+/g);
                    selectCourseInfo[n].classTimes.startSection = Number(timeNumbers[0]);
                    selectCourseInfo[n].classTimes.endSection = Number(timeNumbers[timeNumbers.length - 1]);

                    // 提取次要课程内容信息
                    selectCourseInfo[n].courseName = timetableCourseInfo.courseName;
                    selectCourseInfo[n].teacherName = timetableCourseInfo.teacherName;
                    selectCourseInfo[n].classroom = timetableCourseInfo.classroomName;
                    selectCourseInfo[n].courseName = timetableCourseInfo.courseName;
                    switch (timetableCourseInfo.campusName) {
                        case '海淀校区':
                            selectCourseInfo[n].campusId = 1;
                            break;
                        case '怀柔校区':
                            selectCourseInfo[n].campusId = 2;
                            break;
                    }

                }
            }
        }
    }

    //----------------------------设置课程表-------------------------
    function setCourseTable() {
        for (var i = 0; i < selectCourseInfo.length; i++) {
            var weekday = selectCourseInfo[i].classTimes.weekday - 1;
            var startWeek = selectCourseInfo[i].classTimes.startWeek - 1;
            var endWeek = selectCourseInfo[i].classTimes.endWeek - 1;
            var startSection = selectCourseInfo[i].classTimes.startSection - 1;
            var endSection = selectCourseInfo[i].classTimes.endSection - 1;
            for (var week = startWeek; week <= endWeek; week++) {
                for (var section = startSection; section <= endSection; section++) {
                    courseTableInfo[week][weekday][section].avaliable = false;
                    //console.log(week, weekday, section);
                }
            }
        }
    }

    //-------------------------课程时间冲突检测---------------------------
    function setConfliction() {
        for (var i = 0; i < courseInfo.length; i++) {
            var weekday = courseInfo[i].classTimes.weekday - 1;
            var startWeek = courseInfo[i].classTimes.startWeek - 1;
            var endWeek = courseInfo[i].classTimes.endWeek - 1;
            var startSection = courseInfo[i].classTimes.startSection - 1;
            var endSection = courseInfo[i].classTimes.endSection - 1;
            for (var week = startWeek; week <= endWeek; week++) {
                for (var section = startSection; section <= endSection; section++) {
                    if (!courseTableInfo[week][weekday][section].avaliable) {
                        courseInfo[i].classTimes.confliction = true;
                        // 如果课程未选，添加时间冲突提醒
                        if (!courseInfo[i].studentChoose) {
                            // 创建 span 元素
                            var span = document.createElement("span");
                            // 假设要插入的文本内容为 "文本内容"
                            var text = document.createTextNode("时间冲突！");
                            // 将文本节点添加到 span 元素中
                            span.appendChild(text);
                            // 设置文本样式为红色
                            span.style.color = "red";

                            var element = courseInfo[i].element.classRoom;
                            // 将 span 元素插入到 classroom 元素的后面
                            element.parentNode.insertBefore(span, element.nextSibling);
                        }
                        break;
                    }
                }
                if (courseInfo[i].classTimes.confliction) {
                    break;
                }
            }
        }
    }

    //-----------------------获取课程信息-----------------------------
    function getCourseInfoByRequest(latestCourseInfo) {
        //计算课程总数
        var courseCount = latestCourseInfo.length;

        //循环提取每个课程信息
        for (var i = 0; i < courseCount; i++) {
            //创建课程信息结构体
            var course = Object.assign({}, courseStruct);
            // 创建子结构体的新空对象
            course.classTimes = {};
            course.element = {};
            if (courseInfo.length < courseCount) {
                courseInfo.push(course);
            }

            //----提取课程信息-------
            courseInfo[i].courseListId = i;
            courseInfo[i].courseId = latestCourseInfo[i].courseId;
            courseInfo[i].courseName = latestCourseInfo[i].courseName;
            courseInfo[i].courseCredit = latestCourseInfo[i].courseCredit;
            courseInfo[i].coursePeriod = latestCourseInfo[i].coursePeriod;
            courseInfo[i].volume = latestCourseInfo[i].volume;
            courseInfo[i].alreadyCount = latestCourseInfo[i].alreadyCount;
            courseInfo[i].leftCount = latestCourseInfo[i].volume - latestCourseInfo[i].alreadyCount;
            courseInfo[i].studentChoose = latestCourseInfo[i].studentChoose;
            courseInfo[i].teacherName = latestCourseInfo[i].teacherName;
            courseInfo[i].classRoom = latestCourseInfo[i].classRoom;
            courseInfo[i].classTimes.Text = latestCourseInfo[i].classTimes;
            courseInfo[i].courseName = latestCourseInfo[i].courseName;
            courseInfo[i].campusId = course_campus(courseInfo[i].classRoom);

            //提取详细时间信息
            var timeNumbers = courseInfo[i].classTimes.Text.match(/\d+/g);
            courseInfo[i].classTimes.startWeek = Number(timeNumbers[0]);
            courseInfo[i].classTimes.endWeek = Number(timeNumbers[1]);
            courseInfo[i].classTimes.weekday = Number(timeNumbers[2]);
            courseInfo[i].classTimes.startSection = Number(timeNumbers[3]);
            courseInfo[i].classTimes.endSection = Number(timeNumbers[4]);
            courseInfo[i].classTimes.confliction = false;
        }
    }


    //----------------------获取课程信息元素--------------------------------
    function getCourseInfoElement() {
        //提取课程信息组
        var course_raw = document.querySelectorAll('.ant-list-item');
        var course_name = document.querySelectorAll(".pages-sec-student-scheme-pages-choose-choose-common-choose-index-courseName");
        var course_info = document.getElementsByClassName('pages-sec-student-scheme-pages-choose-choose-common-choose-index-courseInfo');
        var course_leftCount = document.getElementsByClassName('pages-sec-student-scheme-pages-choose-choose-common-choose-index-listContent');
        var course_choose = document.getElementsByClassName('pages-sec-student-scheme-pages-choose-choose-common-choose-index-operation');

        //计算课程总数
        var courseCount = latestCourseInfo.length;

        //循环提取每个课程信息
        for (var i = 0; i < courseCount; i++) {
            var raw1 = i * 2;
            var raw2 = i * 2 + 1;

            //----提取课程信息元素----
            courseInfo[i].element.courseRaw = course_raw[i];
            courseInfo[i].element.studentChoose = course_choose[i];
            //第一排
            courseInfo[i].element.courseId = course_info[raw1].querySelectorAll("span")[0];
            courseInfo[i].element.courseCredit = course_info[raw1].querySelectorAll("span")[2];
            courseInfo[i].element.coursePeriod = course_info[raw1].querySelectorAll("span")[3];
            courseInfo[i].element.campus = course_info[raw1].querySelectorAll("span")[4];
            //第二排
            courseInfo[i].element.teacherName = course_info[raw2].querySelectorAll("span")[0];
            courseInfo[i].element.classTimes = course_info[raw2].querySelectorAll("span")[1];
            courseInfo[i].element.classRoom = course_info[raw2].querySelectorAll("span")[2];

            // 设置校区显示文本
            switch (courseInfo[i].campusId) {
                case 1:
                    courseInfo[i].element.campus.innerText = "海淀校区";
                    break;
                case 2:
                    courseInfo[i].element.campus.innerText = "怀柔校区";
                    break;
                default:
                    // 默认情况下执行的操作
                    break;
            }
        }
    }


    //-----------------选课状态判断----------------
    /**
     * 根据学生的选课动作判断对应的选课状态
     * @param {string} course_choose - 选课按钮信息，可以是 '选课' 或 '退课'
     * @returns {number} - 选课状态，0表示未选课，1表示已选课
     */
    function student_choose(course_choose) {
        switch (course_choose) {
            case '选课':
                return false; // 返回选课状态 未选课
            case '退课':
                return true; // 返回选课状态 已选课
        }
    }

    //--------------- 检测校区 -------------------
    /**
     * 根据教室信息判断课程所在的校区
     * @param {string} classRoom - 教室信息
     * @returns {number} - 校区代码，1表示海淀校区，2表示怀柔校区，0表示未知校区
     */
    function course_campus(classRoom) {
        // 定义海淀校区和怀柔校区的教室编号前缀
        var old_classroom = ["A-", "图书馆报告厅"]; // 海淀校区教室
        var new_classroom = ["B3-", "C3-"]; // 怀柔校区教室

        // 构建用于匹配教室编号的正则表达式字符串
        var old_patternString = "^(" + old_classroom.join("|") + ")";
        var new_patternString = "^(" + new_classroom.join("|") + ")";

        // 创建正则表达式对象
        var old_pattern = new RegExp(old_patternString);
        var new_pattern = new RegExp(new_patternString);

        // 判断校区
        if (old_pattern.test(classRoom)) {
            return 1; // 返回校区代码 1 表示海淀校区
        } else if (new_pattern.test(classRoom)) {
            return 2; // 返回校区代码 2 表示怀柔校区
        } else {
            return 0; // 返回校区代码 0 表示未知校区
        }
    }

    //-------------切换元素显隐------------
    function hideElement(element, hide = true) {
        if (element.length) {
            for (var i = 0; i < element.length; i++) {
                if (hide) {
                    element[i].style.display = 'none'; // 隐藏元素
                } else {
                    element[i].style.display = '';
                }
            }
        } else {
            if (hide) {
                element.style.display = 'none'; // 隐藏元素
            } else {
                element.style.display = '';
            }
        }
    }


    //---------------弃用--------------------------------
    /*

    //----------获取课程信息---------------
    function getCourseInfo() {
        //提取课程信息组
        var course_raw = document.querySelectorAll('.ant-list-item');
        var course_name = document.querySelectorAll(".pages-sec-student-scheme-pages-choose-choose-common-choose-index-courseName");
        var course_info = document.getElementsByClassName('pages-sec-student-scheme-pages-choose-choose-common-choose-index-courseInfo');
        var course_leftCount = document.getElementsByClassName('pages-sec-student-scheme-pages-choose-choose-common-choose-index-listContent');
        var course_choose = document.getElementsByClassName('pages-sec-student-scheme-pages-choose-choose-common-choose-index-operation');

        //计算课程总数
        var course_count = course_info.length / 2;

        //循环提取每个课程信息
        for (var i = 0; i < course_count; i++) {
            var raw1 = i * 2;
            var raw2 = i * 2 + 1;

            //创建课程信息结构体
            var course = Object.assign({}, courseStruct);
            // 创建子结构体的新空对象
            course.classTimes = {};
            course.element = {};
            if (courseInfo.length < course_count) {
                courseInfo.push(course);
            }

            //----提取课程信息元素----
            courseInfo[i].element.courseRaw = course_raw[i];
            courseInfo[i].element.studentChoose = course_choose[i];
            //第一排
            courseInfo[i].element.courseId = course_info[raw1].querySelectorAll("span")[0];
            courseInfo[i].element.courseCredit = course_info[raw1].querySelectorAll("span")[2];
            courseInfo[i].element.coursePeriod = course_info[raw1].querySelectorAll("span")[3];
            courseInfo[i].element.campus = course_info[raw1].querySelectorAll("span")[4];
            //第二排
            courseInfo[i].element.teacherName = course_info[raw2].querySelectorAll("span")[0];
            courseInfo[i].element.classTimes = course_info[raw2].querySelectorAll("span")[1];
            courseInfo[i].element.classRoom = course_info[raw2].querySelectorAll("span")[2];

            //----提取课程信息-------
            courseInfo[i].courseListId = i;
            courseInfo[i].courseName = course_name[i].textContent;
            courseInfo[i].leftCount = Number(course_leftCount[0].textContent.match(/\d+/g));
            courseInfo[i].studentChoose = student_choose(course_choose[i].textContent);
            //第一排
            courseInfo[i].courseId = courseInfo[i].element.courseId.textContent;
            courseInfo[i].courseCredit = Number(courseInfo[i].element.courseCredit.textContent.match(/\d+/g));
            courseInfo[i].coursePeriod = Number(courseInfo[i].element.coursePeriod.textContent.match(/\d+/g));
            //第二排
            courseInfo[i].teacherName = courseInfo[i].element.teacherName.textContent;
            courseInfo[i].classTimes.Times = courseInfo[i].element.classTimes.textContent;
            courseInfo[i].classRoom = courseInfo[i].element.classRoom.textContent;
            courseInfo[i].campusId = course_campus(courseInfo[i]);
            //提取详细时间信息
            var timeNumbers = courseInfo[i].classTimes.Times.match(/\d+/g);
            courseInfo[i].classTimes.startWeek = Number(timeNumbers[0]);
            courseInfo[i].classTimes.endWeek = Number(timeNumbers[1]);
            courseInfo[i].classTimes.weekday = Number(timeNumbers[2]);
            courseInfo[i].classTimes.startSection = Number(timeNumbers[3]);
            courseInfo[i].classTimes.endSection = Number(timeNumbers[4]);
        }
    }


    -----------------------弃用---------------------*/
})();
