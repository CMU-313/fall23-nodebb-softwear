<span component="post/tools" class="dropdown moderator-tools bottom-sheet <!-- IF !posts.display_post_menu -->hidden<!-- ENDIF !posts.display_post_menu -->">
    <a href="#" data-toggle="dropdown" data-ajaxify="false"><i class="fa fa-fw fa-ellipsis-v"></i></a>
    <ul class="dropdown-menu dropdown-menu-right" role="menu">
        <li>
            <a component="post/endorse" role="menuitem" tabindex="-1" data-endorsed="{posts.isEndorsed}" href="#">
                <span>
                    <i component="post/endorse/on" <!-- IF !posts.endorsed -->hidden<!-- ENDIF !posts.endorsed -->">Mark post as Correct</i>
                    <i component="post/endorse/off" <!-- IF posts.endorsed -->hidden<!-- ENDIF posts.endorsed -->">Unmark post</i>
                </span>
            </a>
        </li>
    </ul>
</span>
