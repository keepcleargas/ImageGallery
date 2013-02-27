## 插件描述
一个简单的图片预览jquery 插件.

##使用方法

<!-- code -->
html代码:

        <form class="form-horizontal" id="feed-form"
              enctype="multipart/form-data">
            <div>
             <span class="btn btn-file"><span>添加图片</span> <!--包含:file输入的输入容器  -->
                        <input type="file" name="files[0]" class="input-file current" multiple>
             </span>
            </div>
        </form>
        <div class="pear-line"></div>
        <div id="image-gallery" class="row-fluid gallery"> <!--.gallery作为图片展示的容器-->
            <ul class="thumbnails">
            </ul>
        </div>

js调用:

        $(document).ready(function () {
            $('.btn-file').imageGallery();
        });

##功能描述

当前只有 简单的删除bar/图片画廊展示.
todo:多文件上传/更多定制