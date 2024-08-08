package com.Jupiter_Scrum.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Issues") // Correct table name to match entity name
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;
    private String issueType;
    private String status;
    private String summary;
    private String description;
    private String assignee;
    private String labels;
    private String parent;
    private String team;
    private String sprint;
    private Integer storyPointEstimate;
    private String reporter;
    private String attachment;
    private String linkedIssues;
    private Long user_id;
}
